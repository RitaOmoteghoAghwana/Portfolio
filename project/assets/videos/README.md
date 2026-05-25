# Add your UGC videos here

Drop `.mp4` files into this folder, then open `work.html` and paste a video block (template at the bottom of the Work page).

## File naming tips
- Use lowercase, no spaces: `glowline-morning.mp4` ✓ not `Glowline Morning.mp4` ✗
- Keep videos under 20 MB for fast loading — compress with HandBrake or CloudConvert
- 9:16 aspect ratio works best (vertical reel format)

## Optional: poster images
- For each video, you can add a `.jpg` poster (the still frame shown before play)
- Same name as the video: `glowline-morning.jpg`
- Helps the page load faster + looks better when the user lands

## Quick block to paste in work.html
```html
<a href="#" class="reel" data-cat="ugc">
  <span class="play-icon">▶</span>
  <video src="assets/videos/your-file.mp4"
         poster="assets/videos/your-poster.jpg"
         muted loop playsinline preload="metadata"></video>
  <div class="reel-info">
    <span class="tag">Human UGC · Brand</span>
    <h4>Project name</h4>
    <p>Short description</p>
  </div>
</a>
```

`data-cat` options: `ugc` · `music` · `wordpress`
