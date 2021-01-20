unicodes=$( cat subsetFonts/subset.txt )


for file in ./assets/fonts/woff/*
do
    file="${file##*/}"
    out=assets/fonts/subset/$file
    pyftsubset assets/fonts/woff/$file --unicodes="$unicodes" \
        --layout-features='*' --glyph-names --symbol-cmap --legacy-cmap \
        --obfuscate-names --flavor=woff2 --drop-tables+=GSUB\
        --with-zopfli --desubroutinize\
        --output-file=$out
    base64 $out > assets/$file.css
done






# rm assets/fonts/woff/*
# cp assets/fonts/woffBackup/* assets/fonts/woff/
# for font in assets/fonts/woff/*.woff
# do  
#     pyftsubset $font --flavor=woff2 --obfuscate-names --unicodes="U+$uniques" --with-zopfli --drop-tables+=GSUB,GPOS
#     # pyftsubset $font --flavor=woff2 --obfuscate-names --glyphs=$glyphs --with-zopfli --drop-tables+=GSUB,GPOS 
#     woff2_compress $font
#     rm $font
# done

