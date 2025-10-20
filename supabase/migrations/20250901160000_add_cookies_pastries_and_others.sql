/*
  # Add Cookies, Pastries, and Other Items

  1. New Categories
    - Add cookies, pastries, others categories

  2. New Menu Items
    - Cookies: 6 varieties (Classic Chocolate Chip, Red Velvet Cream Cheese, Oatmeal Chocolate Chip, Hershey's Campfire S'mores, Lemon, Signature Ube)
    - Pastries: 3 varieties (Choco Fudge Brownies, Choco-Banana Loaf, Choco Crinkles)
    - Others: 1 item (Creamy Cheese Sauce)

  3. Features
    - Auto-generated UUIDs for all items
    - Detailed descriptions for each product
    - Appropriate pricing
    - High-quality images
    - Proper categorization for easy browsing
*/

-- First, add the new categories
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('cookies', 'Cookies', '🍪', 10, true),
  ('pastries', 'Pastries', '🧁', 11, true),
  ('others', 'Others', '🍽️', 12, true)
ON CONFLICT (id) DO NOTHING;

-- Insert Cookie Items
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  (
    'Classic Chocolate Chip Cookies',
    'Soft, chewy, and decadently packed with chocolate chips in every bite. A timeless favorite that feels like home – pure comfort in cookie form! Grab yours and order now!',
    50,
    'cookies',
    true,
    true,
    'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  (
    'Red Velvet Cream Cheese Cookies',
    'Rich and elegant with a velvety red hue, filled with luscious cream cheese. A bite of indulgence that''s as stunning as it is satisfying. Treat yourself – order now!',
    50,
    'cookies',
    true,
    true,
    'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  (
    'Oatmeal Chocolate Chip Cookies',
    'Wholesome oats meet gooey chocolate chips in this hearty treat – chewy, comforting, and perfect for guilt-free snacking. Enjoy wholesome goodness – order now!',
    50,
    'cookies',
    false,
    true,
    'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  (
    'Hershey''s Campfire S''mores Cookies',
    'A cozy campfire classic in cookie form – loaded with Hershey''s chocolate, toasted mallows, and crushed grahams. Sweet, fun, and perfectly nostalgic! Relive the campfire fun – order now!',
    50,
    'cookies',
    true,
    true,
    'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  (
    'Lemon Cookies',
    'Bright, zesty, and melt-in-your-mouth soft! Each bite bursts with sunshine and freshness – your go-to cookie for a refreshing twist. Bring home the zest – order now!',
    50,
    'cookies',
    false,
    true,
    'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  (
    'Signature Ube Cookies',
    'A Filipino favorite re-imagined – buttery cookies with creamy ube filling and a touch of coconut. Beautifully purple, delightfully unique. Taste local love – order now!',
    50,
    'cookies',
    true,
    true,
    'https://images.pexels.com/photos/4686832/pexels-photo-4686832.jpeg?auto=compress&cs=tinysrgb&w=800'
  );

-- Insert Pastry Items
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  (
    'Choco Fudge Brownies',
    'Fudgy, moist, and irresistibly rich – loaded with nuts and deep chocolate flavor. Pure indulgence for true brownie lovers! Satisfy your craving – order now!',
    320,
    'pastries',
    true,
    true,
    'https://images.pexels.com/photos/1055270/pexels-photo-1055270.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  (
    'Choco-Banana Loaf',
    'Moist banana goodness meets rich chocolate for the perfect balance of fruity and fudgy. A comforting loaf you''ll keep coming back to. Sweet comfort awaits – order now!',
    200,
    'pastries',
    true,
    true,
    'https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  (
    'Choco Crinkles',
    'Fudgy, chewy, and dusted in sweet powdered sugar – the ultimate nostalgic favorite that never goes out of style. Go classic – order now!',
    35,
    'pastries',
    true,
    true,
    'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800'
  );

-- Insert Other Items
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  (
    'Creamy Cheese Sauce',
    'Cheesy, creamy, and dreamy – perfect for dipping, drizzling, or devouring! Your new favorite cheesy companion for every snack. Dip in the goodness – order now!',
    150,
    'others',
    false,
    true,
    'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'
  );

