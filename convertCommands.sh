ffmpeg -i web_comic_11.mp4 -codec: copy -start_number 0 -hls_time 5 -hls_list_size 0 -f hls ./hls/web_comic_11.m3u8
for f in ./*mp4; do ffmpeg -i "$f" -c:v libx264 -preset slow -crf 30 -filter:v scale=-1:1280 -c:a copy "./compressed/${f##*/}"; done;
for i in *.png ; do convert -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -colorspace RGB "$i" "./compressed/${i%.*}.jpg" ; done;
for i in *.jpg ; do convert -sampling-factor 4:2:0 -strip -quality 80 -resize 75% -interlace JPEG -colorspace RGB "$i" "./compressed4550/${i%.*}.jpg" ; done;
# for i in *.png ; do convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% "$i" "./compressed-reco/${i%.*}.jpg" ; done;
for f in ./*mp4; do ffmpeg -i "$f" -c:v libx264 -preset slow -crf 30 -c:a copy "./compressed/${f##*/}"; done;
pngquant name.png
convert "GAS - Title English 2022.png" -fuzz 1% -trim test.png

for f in ./*mp4; do ffmpeg -i "$f" -filter:v scale=-1:1280 -c:v libvpx-vp9 -pass 1 -pix_fmt yuv420p -b:v 0 -crf 15 -speed 4 -tile-columns 6 -frame-parallel 1 -an -y -f webm "./vp9/${f##*/}"; done;
for f in ./vp9/*mp4; do ffmpeg -i "$f" -c:v libvpx-vp9 -pass 2 -pix_fmt yuv420p -b:v 0 -crf 15 -speed 2 -tile-columns 6 -frame-parallel 1 -c:a libopus -b:a 320k -f webm "./vp9/sp/${f##*/}"; done;

ffmpeg -i web_comic_10.mp4 -filter:v scale=-1:1280 -c:v libvpx-vp9 -b:v 2M -pass 1 -an -f null /dev/null && \
ffmpeg -i web_comic_10.mp4 -filter:v scale=-1:1280 -c:v libvpx-vp9 -b:v 2M -pass 2 -c:a libopus web_comic_10.mp4.webm

for f in ./*mp4; do ffmpeg -i "$f" -vf "select=eq(n\,0)" -q:v 3 "./posters/${f%.*}.jpg"; done;