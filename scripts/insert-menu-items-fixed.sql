-- Insert Menu Items SQL Script (Fixed Version)
-- ใช้ slug ในการอ้างอิง categoryId แทน custom ID

-- ================================================
-- 1. INSERT CATEGORIES
-- ================================================

INSERT INTO `Category` (`id`, `name`, `slug`, `sortOrder`, `createdAt`, `updatedAt`) VALUES
('cat_rice_dishes', 'ประเภทข้าว', 'rice-dishes', 1, NOW(), NOW()),
('cat_noodle_dishes', 'ประเภทเส้น', 'noodle-dishes', 2, NOW(), NOW()),
('cat_stir_fry', 'ประเภทผัด', 'stir-fry', 3, NOW(), NOW()),
('cat_fried', 'ประเภททอด', 'fried', 4, NOW(), NOW()),
('cat_salad', 'ประเภทยำ', 'salad', 5, NOW(), NOW()),
('cat_soup', 'ประเภทน้ำ', 'soup', 6, NOW(), NOW()),
('cat_snacks', 'อาหารทานเล่น', 'snacks', 7, NOW(), NOW()),
('cat_coffee', 'กาแฟ', 'coffee', 8, NOW(), NOW()),
('cat_tea', 'ชา', 'tea', 9, NOW(), NOW()),
('cat_matcha', 'มัทฉะ', 'matcha', 10, NOW(), NOW()),
('cat_cocoa', 'โกโก้', 'cocoa', 11, NOW(), NOW()),
('cat_milk', 'นม', 'milk', 12, NOW(), NOW()),
('cat_italian_soda', 'อิตาเลียนโซดา', 'italian-soda', 13, NOW(), NOW()),
('cat_other_drinks', 'เครื่องดื่มอื่นๆ', 'other-drinks', 14, NOW(), NOW()),
('cat_dessert', 'ขนม', 'dessert', 15, NOW(), NOW()),
('cat_toppings', 'เพิ่มท็อปปิ้ง', 'toppings', 16, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `name` = VALUES(`name`), 
  `sortOrder` = VALUES(`sortOrder`), 
  `updatedAt` = NOW();


-- ================================================
-- 2. INSERT MENU ITEMS (ใช้ subquery หา categoryId)
-- ================================================

-- ประเภทข้าว
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_001', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวกะเพรา หมูสับ/เนื้อสับ/ไก่สับ', 'khao-krapao-pork-beef-chicken', 69, 3, FALSE, TRUE, NOW(), NOW()),
('item_002', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวกะเพรา ปลาหมีก/กุ้ง/ทะเล', 'khao-krapao-squid-shrimp-seafood', 75, 3, FALSE, TRUE, NOW(), NOW()),
('item_003', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวกะเพรา ปลากระป๋อง', 'khao-krapao-canned-fish', 69, 3, FALSE, TRUE, NOW(), NOW()),
('item_004', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวหมูสามขั้นคั่วพริกเกลือ', 'khao-moo-sam-chan-khua-prik-kluea', 69, 2, FALSE, TRUE, NOW(), NOW()),
('item_005', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวคั่วพริกเกลือ กุ้ง/ปลาหมึก', 'khao-khua-prik-kluea-shrimp-squid', 75, 2, FALSE, TRUE, NOW(), NOW()),
('item_006', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดฉ่า หมู/เนื้อ/ไก่', 'khao-pad-cha-pork-beef-chicken', 69, 3, FALSE, TRUE, NOW(), NOW()),
('item_007', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดฉ่า กุ้ง/ปลาหมึก/ทะเล', 'khao-pad-cha-shrimp-squid-seafood', 75, 3, FALSE, TRUE, NOW(), NOW()),
('item_008', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวคะน้า หมูชิ้น/หมูสับ', 'khao-khana-pork', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_009', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดพริกแกง หมู/เนื้อ/ไก่', 'khao-pad-prik-kaeng-pork-beef-chicken', 69, 3, FALSE, TRUE, NOW(), NOW()),
('item_010', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดพริกแกง กุ้ง/ปลาหมึก/ทะเล', 'khao-pad-prik-kaeng-shrimp-squid-seafood', 75, 3, FALSE, TRUE, NOW(), NOW()),
('item_011', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดพริกเผา หมู/เนื้อ/ไก่', 'khao-pad-prik-pao-pork-beef-chicken', 69, 2, FALSE, TRUE, NOW(), NOW()),
('item_012', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดพริกเผา กุ้ง/ปลาหมึก/ทะเล', 'khao-pad-prik-pao-shrimp-squid-seafood', 75, 2, FALSE, TRUE, NOW(), NOW()),
('item_013', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดผงกะหรี่ กุ้ง/ปลาหมึก', 'khao-pad-curry-powder-shrimp-squid', 75, 1, FALSE, TRUE, NOW(), NOW()),
('item_014', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดรถไฟ', 'khao-pad-rotfai', 69, 1, FALSE, TRUE, NOW(), NOW()),
('item_015', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดไข่ หมู/กุ้ง/ปลาหมีก', 'khao-pad-kai-pork-shrimp-squid', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_016', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดแหนม', 'khao-pad-naem', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_017', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวผัดกุนเชียง', 'khao-pad-kun-chiang', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_018', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวไข่เจียวหมูสับ', 'khao-kai-jiao-moo-sap', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_019', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวหมูสามชั้นทอดน้ำปลา', 'khao-moo-sam-chan-tod-nam-pla', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_020', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวหมูทอดกระเทียม', 'khao-moo-tod-kratiem', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_021', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวทอดกระเทียม กุ้ง/ปลาหมึก', 'khao-tod-kratiem-shrimp-squid', 75, 0, FALSE, TRUE, NOW(), NOW()),
('item_022', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวกุนเชียงทอด', 'khao-kun-chiang-tod', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_023', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวเปล่า (จาน)', 'khao-plao-plate', 15, 0, FALSE, TRUE, NOW(), NOW()),
('item_024', (SELECT id FROM Category WHERE slug = 'rice-dishes'), 'ข้าวเปล่า (โถ)', 'khao-plao-bowl', 60, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ประเภทเส้น
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_025', (SELECT id FROM Category WHERE slug = 'noodle-dishes'), 'ผัดขี้เมา เส้นใหญ่/มาม่า/วุ้นเส้น', 'pad-kee-mao-noodles', 69, 3, FALSE, TRUE, NOW(), NOW()),
('item_026', (SELECT id FROM Category WHERE slug = 'noodle-dishes'), 'ผัดซีอิ๊ว เส้นใหญ่', 'pad-see-ew', 69, 0, FALSE, TRUE, NOW(), NOW()),
('item_027', (SELECT id FROM Category WHERE slug = 'noodle-dishes'), 'สปาเกตตี้ คาโบนาร่า', 'spaghetti-carbonara', 89, 0, FALSE, TRUE, NOW(), NOW()),
('item_028', (SELECT id FROM Category WHERE slug = 'noodle-dishes'), 'สปาเกตตี้ ซอสมะเขือเทศ', 'spaghetti-tomato-sauce', 89, 0, FALSE, TRUE, NOW(), NOW()),
('item_029', (SELECT id FROM Category WHERE slug = 'noodle-dishes'), 'สปาเกตตี้ ผัดขี้เมา', 'spaghetti-pad-kee-mao', 99, 3, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ประเภทผัด (กับข้าว)
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_030', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดกะเพรา หมูสับ/เนื้อสับ/ไก่สับ', 'pad-krapao-pork-beef-chicken', 100, 3, FALSE, TRUE, NOW(), NOW()),
('item_031', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดกะเพรา กุ้ง/ปลาหมีก/ทะเล', 'pad-krapao-shrimp-squid-seafood', 120, 3, FALSE, TRUE, NOW(), NOW()),
('item_032', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'หมูสามขั้นคั่วพริกเกลือ', 'moo-sam-chan-khua-prik-kluea', 100, 2, FALSE, TRUE, NOW(), NOW()),
('item_033', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'คั่วพริกเกลือ กุ้ง/ปลาหมึก', 'khua-prik-kluea-shrimp-squid', 120, 2, FALSE, TRUE, NOW(), NOW()),
('item_034', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดฉ่า หมู/เนื้อ/ไก่', 'pad-cha-pork-beef-chicken', 100, 3, FALSE, TRUE, NOW(), NOW()),
('item_035', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดฉ่า กุ้ง/ปลาหมีก/ทะเล', 'pad-cha-shrimp-squid-seafood', 120, 3, FALSE, TRUE, NOW(), NOW()),
('item_036', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดคะน้า หมูชิ้น/หมูสับ', 'pad-khana-pork', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_037', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดเผ็ด หมู/เนื้อ/ไก่', 'pad-phet-pork-beef-chicken', 100, 3, FALSE, TRUE, NOW(), NOW()),
('item_038', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดเผ็ด กุ้ง/ปลาหมึก/ทะเล', 'pad-phet-shrimp-squid-seafood', 120, 3, FALSE, TRUE, NOW(), NOW()),
('item_039', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดพริกเผา หมู/เนื้อ/ไก่', 'pad-prik-pao-pork-beef-chicken', 100, 2, FALSE, TRUE, NOW(), NOW()),
('item_040', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดพริกเผา กุ้ง/ปลาหมึก/ทะเล', 'pad-prik-pao-shrimp-squid-seafood', 120, 2, FALSE, TRUE, NOW(), NOW()),
('item_041', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดผงกะหรี่ กุ้ง/ปลาหมึก', 'pad-curry-powder-shrimp-squid', 120, 1, FALSE, TRUE, NOW(), NOW()),
('item_042', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'กล่ำปลีผัดน้ำปลา', 'klam-plee-pad-nam-pla', 80, 0, FALSE, TRUE, NOW(), NOW()),
('item_043', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดผักรวม หมู/กุ้ง', 'pad-pak-ruam-pork-shrimp', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_044', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'ผัดวุ้นเส้น', 'pad-woon-sen', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_045', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'มะระผัดไข่', 'mara-pad-kai', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_046', (SELECT id FROM Category WHERE slug = 'stir-fry'), 'แหนมผัดไข่', 'naem-pad-kai', 100, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ประเภททอด (กับข้าว)
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_047', (SELECT id FROM Category WHERE slug = 'fried'), 'หมูสามชั้นทอดน้ำปลา', 'moo-sam-chan-tod-nam-pla', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_048', (SELECT id FROM Category WHERE slug = 'fried'), 'ปีกไก่ทอดน้ำปลา', 'peek-kai-tod-nam-pla', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_049', (SELECT id FROM Category WHERE slug = 'fried'), 'ปลาหมีกทอดน้ำปลา', 'pla-meuk-tod-nam-pla', 120, 0, FALSE, TRUE, NOW(), NOW()),
('item_050', (SELECT id FROM Category WHERE slug = 'fried'), 'หมูทอดกระเทียม', 'moo-tod-kratiem', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_051', (SELECT id FROM Category WHERE slug = 'fried'), 'ทอดกระเทียม กุ้ง/ปลาหมึก', 'tod-kratiem-shrimp-squid', 120, 0, FALSE, TRUE, NOW(), NOW()),
('item_052', (SELECT id FROM Category WHERE slug = 'fried'), 'ไก่ทอดเกลือ', 'kai-tod-kluea', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_053', (SELECT id FROM Category WHERE slug = 'fried'), 'ไข่เจียวหมูสับ', 'kai-jiao-moo-sap', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_054', (SELECT id FROM Category WHERE slug = 'fried'), 'ไข่เจียวกุ้งสับ', 'kai-jiao-kung-sap', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_055', (SELECT id FROM Category WHERE slug = 'fried'), 'ไข่เจียวแหนม', 'kai-jiao-naem', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_056', (SELECT id FROM Category WHERE slug = 'fried'), 'เอ็นไก่ทอด', 'en-kai-tod', 100, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ประเภทยำ (กับข้าว)
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_057', (SELECT id FROM Category WHERE slug = 'salad'), 'ยำวุ้นเส้น หมูสับ กุ้ง', 'yam-woon-sen-pork-shrimp', 100, 2, FALSE, TRUE, NOW(), NOW()),
('item_058', (SELECT id FROM Category WHERE slug = 'salad'), 'ยำมาม่า หมูสับ กุ้ง', 'yam-mama-pork-shrimp', 100, 2, FALSE, TRUE, NOW(), NOW()),
('item_059', (SELECT id FROM Category WHERE slug = 'salad'), 'ยำสลัดทูน่า', 'yam-salad-tuna', 120, 2, FALSE, TRUE, NOW(), NOW()),
('item_060', (SELECT id FROM Category WHERE slug = 'salad'), 'ยำเห็ดเข็มทองทอดกรอบ', 'yam-het-kem-tong-tod-krop', 120, 2, FALSE, TRUE, NOW(), NOW()),
('item_061', (SELECT id FROM Category WHERE slug = 'salad'), 'กุ้งแช่น้ำปลา', 'kung-chae-nam-pla', 120, 2, FALSE, TRUE, NOW(), NOW()),
('item_062', (SELECT id FROM Category WHERE slug = 'salad'), 'หมูมะนาว', 'moo-manao', 100, 2, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ประเภทน้ำ (กับข้าว)
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_063', (SELECT id FROM Category WHERE slug = 'soup'), 'แกงเขียวหวาน หมู/ไก่/เนื้อ', 'kaeng-khiao-wan-pork-chicken-beef', 150, 2, FALSE, TRUE, NOW(), NOW()),
('item_064', (SELECT id FROM Category WHERE slug = 'soup'), 'แกงเผ็ด หมู/ไก่/เนื้อ', 'kaeng-phet-pork-chicken-beef', 150, 3, FALSE, TRUE, NOW(), NOW()),
('item_065', (SELECT id FROM Category WHERE slug = 'soup'), 'แกงป่า หมู/ไก่/เนื้อ', 'kaeng-pa-pork-chicken-beef', 150, 3, FALSE, TRUE, NOW(), NOW()),
('item_066', (SELECT id FROM Category WHERE slug = 'soup'), 'ต้มข่า หมู/ไก่', 'tom-kha-pork-chicken', 150, 1, FALSE, TRUE, NOW(), NOW()),
('item_067', (SELECT id FROM Category WHERE slug = 'soup'), 'ต้มยำน้ำข้น กุ้ง/ปลาหมึก/ทะเล', 'tom-yam-nam-khon-shrimp-squid-seafood', 150, 3, FALSE, TRUE, NOW(), NOW()),
('item_068', (SELECT id FROM Category WHERE slug = 'soup'), 'ต้มยำน้ำใส กุ้ง/ปลาหมึก/ทะเล', 'tom-yam-nam-sai-shrimp-squid-seafood', 150, 3, FALSE, TRUE, NOW(), NOW()),
('item_069', (SELECT id FROM Category WHERE slug = 'soup'), 'ต้มจืดไข่น้ำ', 'tom-jued-kai-nam', 100, 0, FALSE, TRUE, NOW(), NOW()),
('item_070', (SELECT id FROM Category WHERE slug = 'soup'), 'ต้มจืดผักกาดขาวเต้าหู้หมูสับ', 'tom-jued-pak-kad-khao-tofu-moo-sap', 100, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- อาหารทานเล่น
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_071', (SELECT id FROM Category WHERE slug = 'snacks'), 'เฟรนฟรายส์', 'french-fries', 59, 0, FALSE, TRUE, NOW(), NOW()),
('item_072', (SELECT id FROM Category WHERE slug = 'snacks'), 'นักเก็ต', 'nuggets', 59, 0, FALSE, TRUE, NOW(), NOW()),
('item_073', (SELECT id FROM Category WHERE slug = 'snacks'), 'ไก่ป๊อป', 'chicken-pop', 59, 0, FALSE, TRUE, NOW(), NOW()),
('item_074', (SELECT id FROM Category WHERE slug = 'snacks'), 'ชีสบอล', 'cheese-ball', 79, 0, FALSE, TRUE, NOW(), NOW()),
('item_075', (SELECT id FROM Category WHERE slug = 'snacks'), 'โดนัทกุ้ง', 'donut-shrimp', 89, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- กาแฟ
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_076', (SELECT id FROM Category WHERE slug = 'coffee'), 'เอสเพรสโซ่', 'espresso', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_077', (SELECT id FROM Category WHERE slug = 'coffee'), 'ลาเต้', 'latte', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_078', (SELECT id FROM Category WHERE slug = 'coffee'), 'คาปูชิโน่', 'cappuccino', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_079', (SELECT id FROM Category WHERE slug = 'coffee'), 'คาราเมลมัคคิอาโต้', 'caramel-macchiato', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_080', (SELECT id FROM Category WHERE slug = 'coffee'), 'มอคค่า', 'mocha', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_081', (SELECT id FROM Category WHERE slug = 'coffee'), 'อเมริกาโน่', 'americano', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_082', (SELECT id FROM Category WHERE slug = 'coffee'), 'อเมริกาโน่ ส้ม', 'americano-orange', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_083', (SELECT id FROM Category WHERE slug = 'coffee'), 'อเมริกาโน่ มะพร้าว', 'americano-coconut', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_084', (SELECT id FROM Category WHERE slug = 'coffee'), 'อเมริกาโน่ น้ำผึ้ง', 'americano-honey', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_085', (SELECT id FROM Category WHERE slug = 'coffee'), 'อเมริกาโน่ น้ำผึ้งมะนาว', 'americano-honey-lemon', 60, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ชา
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_086', (SELECT id FROM Category WHERE slug = 'tea'), 'ชาไทย', 'thai-tea', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_087', (SELECT id FROM Category WHERE slug = 'tea'), 'ชาเขียว', 'green-tea', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_088', (SELECT id FROM Category WHERE slug = 'tea'), 'ชาไทยไม่ใส่สี', 'thai-tea-no-color', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_089', (SELECT id FROM Category WHERE slug = 'tea'), 'ชาดำเย็น', 'black-tea-iced', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_090', (SELECT id FROM Category WHERE slug = 'tea'), 'ชามะนาว', 'lemon-tea', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_091', (SELECT id FROM Category WHERE slug = 'tea'), 'ชาไทยสตรอเบอรี่', 'thai-tea-strawberry', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_092', (SELECT id FROM Category WHERE slug = 'tea'), 'ชาเขียวสตรอเบอรี่', 'green-tea-strawberry', 60, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- มัทฉะ
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_093', (SELECT id FROM Category WHERE slug = 'matcha'), 'มัทฉะลาเต้', 'matcha-latte', 65, 0, FALSE, TRUE, NOW(), NOW()),
('item_094', (SELECT id FROM Category WHERE slug = 'matcha'), 'มัทฉะสตรอเบอรี่', 'matcha-strawberry', 65, 0, FALSE, TRUE, NOW(), NOW()),
('item_095', (SELECT id FROM Category WHERE slug = 'matcha'), 'มัทฉะมะพร้าว', 'matcha-coconut', 65, 0, FALSE, TRUE, NOW(), NOW()),
('item_096', (SELECT id FROM Category WHERE slug = 'matcha'), 'เพียวมัทฉะ', 'pure-matcha', 65, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- โกโก้
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_097', (SELECT id FROM Category WHERE slug = 'cocoa'), 'โกโก้', 'cocoa', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_098', (SELECT id FROM Category WHERE slug = 'cocoa'), 'โกโก้ชาไทย', 'cocoa-thai-tea', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_099', (SELECT id FROM Category WHERE slug = 'cocoa'), 'โกโก้ชาเขียว', 'cocoa-green-tea', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_100', (SELECT id FROM Category WHERE slug = 'cocoa'), 'โกโก้สตรอเบอรี่', 'cocoa-strawberry', 60, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- นม
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_101', (SELECT id FROM Category WHERE slug = 'milk'), 'นมสดเย็น', 'fresh-milk-iced', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_102', (SELECT id FROM Category WHERE slug = 'milk'), 'นมสดคาราเมล', 'fresh-milk-caramel', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_103', (SELECT id FROM Category WHERE slug = 'milk'), 'นมสดสตรอเบอรี่', 'fresh-milk-strawberry', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_104', (SELECT id FROM Category WHERE slug = 'milk'), 'นมชมพู', 'pink-milk', 60, 0, FALSE, TRUE, NOW(), NOW()),
('item_105', (SELECT id FROM Category WHERE slug = 'milk'), 'นมมรกต', 'jade-milk', 60, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- อิตาเลียนโซดา
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_106', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'บลูเลม่อนโซดา', 'blue-lemon-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_107', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'บลูเบอรี่โซดา', 'blueberry-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_108', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'สตรอเบอรี่โซดา', 'strawberry-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_109', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'ลิ้นจี่โซดา', 'lychee-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_110', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'เสาวรสโซดา', 'passion-fruit-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_111', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'แอปเปิ้ลโซดา', 'apple-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_112', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'มะม่วงโซดา', 'mango-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_113', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'น้ำผึ้งมะนาวโซดา', 'honey-lemon-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_114', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'แดงมะนาวโซดา', 'red-lemon-soda', 50, 0, FALSE, TRUE, NOW(), NOW()),
('item_115', (SELECT id FROM Category WHERE slug = 'italian-soda'), 'แดงโซดา', 'red-soda', 50, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- เครื่องดื่มอื่นๆ
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_116', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'น้ำเปล่า (ขวดเล็ก)', 'water-small', 10, 0, FALSE, TRUE, NOW(), NOW()),
('item_117', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'น้ำเปล่า (ขวดใหญ่)', 'water-large', 20, 0, FALSE, TRUE, NOW(), NOW()),
('item_118', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'โค้กซีโร่', 'coke-zero', 15, 0, FALSE, TRUE, NOW(), NOW()),
('item_119', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'โค้ก', 'coke', 15, 0, FALSE, TRUE, NOW(), NOW()),
('item_120', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'แฟนต้าส้ม', 'fanta-orange', 15, 0, FALSE, TRUE, NOW(), NOW()),
('item_121', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'แฟนต้าเขียว', 'fanta-green', 15, 0, FALSE, TRUE, NOW(), NOW()),
('item_122', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'เป๊ปซี่ขวดใหญ่', 'pepsi-large', 30, 0, FALSE, TRUE, NOW(), NOW()),
('item_123', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'เบียร์สิงห์', 'singha-beer', 90, 0, FALSE, TRUE, NOW(), NOW()),
('item_124', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'เบียร์ลีโอ', 'leo-beer', 80, 0, FALSE, TRUE, NOW(), NOW()),
('item_125', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'เบียร์บัดไวเซอร์', 'budweiser-beer', 65, 0, FALSE, TRUE, NOW(), NOW()),
('item_126', (SELECT id FROM Category WHERE slug = 'other-drinks'), 'เบียร์ไฮเนเก้น', 'heineken-beer', 70, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ขนม
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_127', (SELECT id FROM Category WHERE slug = 'dessert'), 'ขนมปังปิ้ง เนย นม', 'toast-butter-milk', 39, 0, FALSE, TRUE, NOW(), NOW()),
('item_128', (SELECT id FROM Category WHERE slug = 'dessert'), 'ขนมปังปิ้ง เนย นม น้ำตาล', 'toast-butter-milk-sugar', 39, 0, FALSE, TRUE, NOW(), NOW()),
('item_129', (SELECT id FROM Category WHERE slug = 'dessert'), 'ขนมปังปิ้ง นูเทลล่า', 'toast-nutella', 49, 0, FALSE, TRUE, NOW(), NOW()),
('item_130', (SELECT id FROM Category WHERE slug = 'dessert'), 'ขนมปังปิ้ง เนยถั่ว', 'toast-peanut-butter', 49, 0, FALSE, TRUE, NOW(), NOW()),
('item_131', (SELECT id FROM Category WHERE slug = 'dessert'), 'ขนมปังปิ้ง สังขยา', 'toast-sangkhaya', 49, 0, FALSE, TRUE, NOW(), NOW()),
('item_132', (SELECT id FROM Category WHERE slug = 'dessert'), 'ขนมปังปิ้ง แยมสตรอเบอรี่', 'toast-strawberry-jam', 49, 0, FALSE, TRUE, NOW(), NOW()),
('item_133', (SELECT id FROM Category WHERE slug = 'dessert'), 'ขนมปังปิ้ง วิปครีม', 'toast-whipped-cream', 49, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ท็อปปิ้ง
INSERT INTO `MenuItem` (`id`, `categoryId`, `name`, `slug`, `price`, `spicyLevel`, `isSignature`, `isActive`, `createdAt`, `updatedAt`) VALUES
('item_134', (SELECT id FROM Category WHERE slug = 'toppings'), 'ลิ้นจี่ป็อป', 'lychee-pop', 10, 0, FALSE, TRUE, NOW(), NOW()),
('item_135', (SELECT id FROM Category WHERE slug = 'toppings'), 'มะม่วงป๊อป', 'mango-pop', 10, 0, FALSE, TRUE, NOW(), NOW()),
('item_136', (SELECT id FROM Category WHERE slug = 'toppings'), 'บลูเบอรี่ป็อป', 'blueberry-pop', 10, 0, FALSE, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `categoryId` = VALUES(`categoryId`), 
  `name` = VALUES(`name`), 
  `price` = VALUES(`price`), 
  `spicyLevel` = VALUES(`spicyLevel`), 
  `isSignature` = VALUES(`isSignature`), 
  `isActive` = VALUES(`isActive`), 
  `updatedAt` = NOW();

-- ================================================
-- สรุป
-- ================================================
-- Categories: 16 หมวดหมู่
-- Menu Items: 136 รายการ
-- ใช้ subquery (SELECT id FROM Category WHERE slug = '...') เพื่อหา categoryId จาก slug

