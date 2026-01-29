import json
import os

# Paths
INPUT_FILE = 'public/quran-simple.json'
OUTPUT_FILE = 'public/quran-optimized.json'

def count_words_chars(text):
    # Basic word/char counting logic
    words = len(text.strip().split())
    chars = len(text.replace(' ', '').replace('\n', ''))
    return [words, chars]

def optimize_data():
    if not os.path.exists(INPUT_FILE):
        print(f"Error: {INPUT_FILE} not found.")
        return

    print("Loading raw Quran data...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    optimized_surahs = []
    
    # Structure is a list of surahs
    # [ { "id": 1, "verses": [...] }, ... ]
    
    surahs_list = data
    if isinstance(data, dict) and 'surahs' in data:
         surahs_list = data['surahs']

    print(f"Processing {len(surahs_list)} Surahs...")

    for surah in surahs_list:
        # Match keys from verified file content
        surah_id = surah.get('id') or surah.get('number')
        name_ar = surah.get('name')
        # "transliteration" is present in file
        transliteration = surah.get('transliteration') or surah.get('englishName')
        # "translation" might be missing, use empty string if not found
        translation = surah.get('translation') or surah.get('englishNameTranslation') or ""
        
        verses_list = surah.get('verses') or surah.get('ayahs') or []

        verses_stats = []
        for ayah in verses_list:
            text = ayah.get('text', '')
            stats = count_words_chars(text)
            verses_stats.append(stats)

        optimized_surahs.append({
            "id": surah_id,
            "name": name_ar,
            "transliteration": transliteration, 
            "translation": translation, 
            "total_verses": len(verses_stats),
            "verses": verses_stats # List of [words, chars]
        })

    print(f"Saving optimized data to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(optimized_surahs, f, ensure_ascii=False, separators=(',', ':'))

    # Stats
    orig_size = os.path.getsize(INPUT_FILE) / 1024
    new_size = os.path.getsize(OUTPUT_FILE) / 1024
    print(f"Done! Reduced size from {orig_size:.2f} KB to {new_size:.2f} KB")

if __name__ == "__main__":
    optimize_data()
