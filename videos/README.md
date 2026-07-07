# videos/

Short demo clips live here. To swap a clip, **replace the file but keep the
same filename**.

## Files in use

| Filename | Where it shows |
| --- | --- |
| `robot-tour-v2-demo.mp4` | Robot Tour v2 page, "Demo video" |
| `electric-vehicle-v1-demo.mp4` | Electric Vehicle v1 page, "Demo video" |

## Tips for web video

- Keep clips short (a few seconds to ~30s) and the file small (ideally under
  ~5 MB) so pages load fast.
- Use **MP4 (H.264)**. It plays in every modern browser.
- Each video has a matching **poster image** in `images/` (named
  `…-demo-poster.jpg`) that shows before the clip plays — update it if you
  change the clip.
- The clips on this site are muted by design. If a new clip has sound you want
  to keep, remove the `muted` behaviour by editing the `<video>` tag on that
  project page.

### Re-compress a clip with ffmpeg (optional)

If a video is too large, you can shrink it:

```bash
ffmpeg -i input.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 26 \
  -preset veryfast -movflags +faststart -an videos/your-clip-demo.mp4
```

And grab a poster frame (about 1.5 seconds in):

```bash
ffmpeg -ss 1.5 -i input.mp4 -frames:v 1 images/your-clip-demo-poster.jpg
```
