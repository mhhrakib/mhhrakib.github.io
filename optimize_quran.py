import json
import os

# Paths
INPUT_FILE = 'public/quran-simple.json'
OUTPUT_FILE = 'public/quran-optimized.json'

def count_words_chars(text):
    # Basic word/char counting logic consistent with previous verification
    # Using strict whitespace splitting for words
    words = len(text.strip().split())
    # Counting non-whitespace chars
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
    
    # Check structure (handle if it's wrapped in 'data' key or list)
    # Based on previous context, structure seems to be a list of surahs
    # or { "surahs": [...] } depending on source. Let's inspect slightly.
    # Assuming standard simple-quran format: {"code":..., "status":..., "data": { "surahs": [...] } } or just list.
    # I'll check common patterns.
    
    surahs_list = []
    if isinstance(data, list):
        surahs_list = data
    elif isinstance(data, dict):
        if 'surahs' in data:
            surahs_list = data['surahs']
        elif 'data' in data and 'surahs' in data['data']:
            surahs_list = data['data']['surahs']
        else:
            # Fallback for simple raw list wrapped in dict?
            pass

    print(f"Processing {len(surahs_list)} Surahs...")

    for surah in surahs_list:
        surah_id = surah.get('number')
        name_ar = surah.get('name')
        name_en = surah.get('englishName')
        transliteration = surah.get('englishNameTranslation') # Usually 'englishName' is transliteration in some APIs, let's check
        # Actually in quran-simple.json from API:
        # name: "سُورَةُ ٱلْفَاتِحَةِ"
        # englishName: "Al-Fatiha"
        # englishNameTranslation: "The Opening"
        
        # We want transliteration for search ("Al-Fatiha") and Arabic name.
        
        verses_stats = []
        for ayah in surah.get('ayahs', []):
            text = ayah.get('text', '')
            # Handle Basmala logic if needed? 
            # Usually quran-simple includes/excludes basmala consistently. 
            # We just count what's in the text.
            stats = count_words_chars(text)
            verses_stats.append(stats)

        optimized_surahs.append({
            "id": surah_id,
            "name": name_ar,
            "transliteration": name_en, # Using English Name as transliteration
            "translation": transliteration, # The meaning
            "total_verses": len(verses_stats),
            "verses": verses_stats # List of [words, chars]
        })

    print(f"Saving optimized data to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(optimized_surahs, f, ensure_ascii=False, separators=(',', ':')) # Minify with separators

    # Stats
    orig_size = os.path.getsize(INPUT_FILE) / 1024
    new_size = os.path.getsize(OUTPUT_FILE) / 1024
    print(f"Done! Reduced size from {orig_size:.2f} KB to {new_size:.2f} KB")

if __name__ == "__main__":
    optimize_data()
