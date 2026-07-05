"""Generate placeholder OG images and icons for the portfolio."""
from PIL import Image, ImageDraw, ImageFont
import os

PUBLIC = os.path.join(os.path.dirname(__file__), '..', 'public')


def create_og_image(filename, title, subtitle="Nicolás Rodríguez", bg_color=(9, 9, 11)):
    """Create a 1200x630 OG placeholder image."""
    img = Image.new('RGB', (1200, 630), bg_color)
    draw = ImageDraw.Draw(img)

    # Draw a gradient-ish background (simple approach: darker bottom)
    for y in range(630):
        factor = y / 630
        r = int(bg_color[0] + (99 - bg_color[0]) * factor * 0.15)
        g = int(bg_color[1] + (102 - bg_color[1]) * factor * 0.15)
        b = int(bg_color[2] + (241 - bg_color[2]) * factor * 0.15)
        draw.line([(0, y), (1200, y)], fill=(r, g, b))

    # Accent bar on the left
    for x in range(8):
        draw.line([(x, 0), (x, 630)], fill=(99, 102, 241))

    # Try to load a font, fall back to default
    try:
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 56)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
    except (IOError, OSError):
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Title
    draw.text((80, 220), title, fill=(244, 244, 245), font=font_large)

    # Subtitle
    draw.text((80, 300), subtitle, fill=(161, 161, 170), font=font_small)

    # Decorative accent line
    draw.rectangle([(80, 380), (400, 384)], fill=(99, 102, 241))

    img.save(filename, 'JPEG', quality=85)


def create_icon(filename, size, bg_color=(9, 9, 11), accent_color=(99, 102, 241)):
    """Create a simple icon with initials."""
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    # Simple geometric shape: rounded square with accent
    margin = size // 6
    rect = [margin, margin, size - margin, size - margin]

    # Draw a simple "N" shape using rectangles
    n_width = size // 4
    spacing = size // 4
    left_x = size // 2 - spacing - n_width // 2
    right_x = size // 2 + spacing - n_width // 2
    mid_y_top = margin + (size - 2 * margin) // 4
    mid_y_bottom = size - margin - (size - 2 * margin) // 4

    # Left vertical bar
    draw.rectangle([left_x, margin, left_x + n_width, size - margin], fill=accent_color)
    # Right vertical bar
    draw.rectangle([right_x, margin, right_x + n_width, size - margin], fill=accent_color)
    # Diagonal connection
    draw.polygon([
        (left_x + n_width, margin),
        (right_x, size - margin),
        (right_x + n_width, size - margin),
        (left_x + n_width * 2, margin),
    ], fill=accent_color)

    img.save(filename, 'PNG')


def main():
    print("Generating OG images...")
    create_og_image(os.path.join(PUBLIC, 'og-freelance.jpg'),
                    "Desarrollo Web Profesional",
                    "Nicolás Rodríguez")
    create_og_image(os.path.join(PUBLIC, 'og-recruiter.jpg'),
                    "Full Stack Developer",
                    "Nicolás Rodríguez")
    create_og_image(os.path.join(PUBLIC, 'og-default.jpg'),
                    "Nicolás Rodríguez",
                    "Desarrollo Web & Software")

    print("Generating icons...")
    create_icon(os.path.join(PUBLIC, 'apple-touch-icon.png'), 180)
    create_icon(os.path.join(PUBLIC, 'icon-192.png'), 192)
    create_icon(os.path.join(PUBLIC, 'icon-512.png'), 512)

    print("Done! All assets generated in public/")


if __name__ == '__main__':
    main()
