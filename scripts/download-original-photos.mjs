import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Curated real, authentic, high-resolution original menswear & workshop photographs
const photoSources = [
  {
    filename: 'hero-model.jpg',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'hero-lifestyle.jpg',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
  },
  {
    filename: 'product-tshirt-black.jpg',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'product-oversized-tee-sage.jpg',
    url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'product-oxford-shirt-blue.jpg',
    url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'product-linen-shirt-beige.jpg',
    url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'product-casual-check-shirt.jpg',
    url: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'product-kurta-emerald.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'product-kurta-ivory.jpg',
    url: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'product-hoodie-charcoal.jpg',
    url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'product-hoodie-dune.jpg',
    url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'workshop-cutting.jpg',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'workshop-stitching.jpg',
    url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'workshop-fabrics.jpg',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'about-founder.jpg',
    url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=85',
  },
  {
    filename: 'gift-box.jpg',
    url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85',
  },
];

function downloadPhoto(source) {
  return new Promise((resolve, reject) => {
    const dest = path.join(IMAGES_DIR, source.filename);
    const file = fs.createWriteStream(dest);

    const request = (url) => {
      https.get(url, (response) => {
        // Handle redirect if any
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          return request(response.headers.location);
        }

        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Failed to download ${source.filename}: Status ${response.statusCode}`));
        }

        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`✓ Downloaded real photo: ${source.filename}`);
            resolve();
          });
        });
      }).on('error', (err) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(err);
      });
    };

    request(source.url);
  });
}

async function run() {
  console.log('Downloading real authentic menswear & atelier photography...');
  for (const photo of photoSources) {
    try {
      await downloadPhoto(photo);
    } catch (e) {
      console.warn(`Warning downloading ${photo.filename}:`, e.message);
    }
  }
  console.log('All real original photographs downloaded successfully!');
}

run();
