#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json

# อ่านไฟล์เดิม
with open('farm_aroi_kb.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# ข้อมูลเมนูทั้งหมดจากชีท menu_price
new_menus = {
    "categories": [
        {
            "category_id": "rice_dishes",
            "name_th": "อาหารจานเดียว - ประเภทข้าว",
            "name_en": "Rice Dishes",
            "items": [
                {"id": "rice_kaprao_pork_beef_chicken", "name_th": "ข้าวกะเพรา หมูสับ/เนื้อสับ/ไก่สับ", "name_en": "Rice with Stir-fried Basil Pork/Beef/Chicken", "price": 69, "currency": "THB", "popular": True},
                {"id": "rice_kaprao_squid_shrimp_seafood", "name_th": "ข้าวกะเพรา ปลาหมึก/กุ้ง/ทะเล", "name_en": "Rice with Stir-fried Basil Squid/Shrimp/Seafood", "price": 75, "currency": "THB", "popular": True},
                {"id": "rice_kaprao_canned_fish", "name_th": "ข้าวกะเพรา ปลากระป๋อง", "name_en": "Rice with Stir-fried Basil Canned Fish", "price": 69, "currency": "THB"},
                {"id": "rice_pork_belly_salt_pepper", "name_th": "ข้าวหมูสามชั้นคั่วพริกเกลือ", "name_en": "Rice with Salt & Pepper Pork Belly", "price": 69, "currency": "THB", "popular": True},
                {"id": "rice_salt_pepper_shrimp_squid", "name_th": "ข้าวคั่วพริกเกลือ กุ้ง/ปลาหมึก", "name_en": "Rice with Salt & Pepper Shrimp/Squid", "price": 75, "currency": "THB"},
                {"id": "rice_pad_cha_pork_beef_chicken", "name_th": "ข้าวผัดฉ่า หมู/เนื้อ/ไก่", "name_en": "Rice with Spicy Stir-fried Pork/Beef/Chicken", "price": 69, "currency": "THB"},
                {"id": "rice_pad_cha_shrimp_squid_seafood", "name_th": "ข้าวผัดฉ่า กุ้ง/ปลาหมึก/ทะเล", "name_en": "Rice with Spicy Stir-fried Shrimp/Squid/Seafood", "price": 75, "currency": "THB"},
                {"id": "rice_kale_pork", "name_th": "ข้าวคะน้า หมูชิ้น/หมูสับ", "name_en": "Rice with Stir-fried Kale & Pork", "price": 69, "currency": "THB"},
                {"id": "fried_rice_curry_paste_pork_beef_chicken", "name_th": "ข้าวผัดพริกแกง หมู/เนื้อ/ไก่", "name_en": "Curry Paste Fried Rice with Pork/Beef/Chicken", "price": 69, "currency": "THB"},
                {"id": "fried_rice_curry_paste_shrimp_squid_seafood", "name_th": "ข้าวผัดพริกแกง กุ้ง/ปลาหมึก/ทะเล", "name_en": "Curry Paste Fried Rice with Shrimp/Squid/Seafood", "price": 75, "currency": "THB"},
                {"id": "fried_rice_chili_paste_pork_beef_chicken", "name_th": "ข้าวผัดพริกเผา หมู/เนื้อ/ไก่", "name_en": "Chili Paste Fried Rice with Pork/Beef/Chicken", "price": 69, "currency": "THB"},
                {"id": "fried_rice_chili_paste_shrimp_squid_seafood", "name_th": "ข้าวผัดพริกเผา กุ้ง/ปลาหมึก/ทะเล", "name_en": "Chili Paste Fried Rice with Shrimp/Squid/Seafood", "price": 75, "currency": "THB"},
                {"id": "fried_rice_curry_powder_shrimp_squid", "name_th": "ข้าวผัดผงกะหรี่ กุ้ง/ปลาหมึก", "name_en": "Curry Powder Fried Rice with Shrimp/Squid", "price": 75, "currency": "THB"},
                {"id": "fried_rice_train", "name_th": "ข้าวผัดรถไฟ", "name_en": "Train Fried Rice", "price": 69, "currency": "THB"},
                {"id": "fried_rice_egg_pork_shrimp_squid", "name_th": "ข้าวผัดไข่ หมู/กุ้ง/ปลาหมึก", "name_en": "Egg Fried Rice with Pork/Shrimp/Squid", "price": 69, "currency": "THB"},
                {"id": "fried_rice_fermented_pork", "name_th": "ข้าวผัดแหนม", "name_en": "Fried Rice with Fermented Pork", "price": 69, "currency": "THB"},
                {"id": "fried_rice_chinese_sausage", "name_th": "ข้าวผัดกุนเชียง", "name_en": "Fried Rice with Chinese Sausage", "price": 69, "currency": "THB"},
                {"id": "rice_omelet_pork", "name_th": "ข้าวไข่เจียวหมูสับ", "name_en": "Rice with Pork Omelet", "price": 69, "currency": "THB"},
                {"id": "rice_fried_pork_belly_fish_sauce", "name_th": "ข้าวหมูสามชั้นทอดน้ำปลา", "name_en": "Rice with Fried Pork Belly in Fish Sauce", "price": 69, "currency": "THB", "popular": True},
                {"id": "rice_fried_garlic_pork", "name_th": "ข้าวหมูทอดกระเทียม", "name_en": "Rice with Garlic Fried Pork", "price": 69, "currency": "THB"},
                {"id": "rice_fried_garlic_shrimp_squid", "name_th": "ข้าวทอดกระเทียม กุ้ง/ปลาหมึก", "name_en": "Rice with Garlic Fried Shrimp/Squid", "price": 75, "currency": "THB"},
                {"id": "rice_fried_chinese_sausage", "name_th": "ข้าวกุนเชียงทอด", "name_en": "Rice with Fried Chinese Sausage", "price": 69, "currency": "THB"},
                {"id": "plain_rice", "name_th": "ข้าวเปล่า (จาน/โถ)", "name_en": "Plain Rice (Plate/Bowl)", "price": "15/60", "currency": "THB"}
            ]
        },
        {
            "category_id": "noodle_dishes",
            "name_th": "อาหารจานเดียว - ประเภทเส้น",
            "name_en": "Noodle Dishes",
            "items": [
                {"id": "pad_kee_mao_noodles", "name_th": "ผัดขี้เมา เส้นใหญ่/มาม่า/วุ้นเส้น", "name_en": "Drunken Noodles", "price": 69, "currency": "THB", "popular": True},
                {"id": "pad_see_ew", "name_th": "ผัดซีอิ๊ว เส้นใหญ่", "name_en": "Pad See Ew", "price": 69, "currency": "THB"},
                {"id": "spaghetti_carbonara", "name_th": "สปาเกตตี้ คาโบนาร่า", "name_en": "Spaghetti Carbonara", "price": 89, "currency": "THB"},
                {"id": "spaghetti_tomato", "name_th": "สปาเกตตี้ ซอสมะเขือเทศ", "name_en": "Spaghetti with Tomato Sauce", "price": 89, "currency": "THB"},
                {"id": "spaghetti_pad_kee_mao", "name_th": "สปาเกตตี้ ผัดขี้เมา", "name_en": "Spaghetti Pad Kee Mao Style", "price": "89-99", "currency": "THB"}
            ]
        },
        {
            "category_id": "side_dishes_stir_fried",
            "name_th": "กับข้าว - ประเภทผัด",
            "name_en": "Side Dishes - Stir-fried",
            "items": [
                {"id": "pad_kaprao_pork_beef_chicken", "name_th": "ผัดกะเพรา หมูสับ/เนื้อสับ/ไก่สับ", "name_en": "Stir-fried Holy Basil Pork/Beef/Chicken", "price": 100, "currency": "THB", "popular": True},
                {"id": "pad_kaprao_shrimp_squid_seafood", "name_th": "ผัดกะเพรา กุ้ง/ปลาหมึก/ทะเล", "name_en": "Stir-fried Holy Basil Shrimp/Squid/Seafood", "price": 120, "currency": "THB", "popular": True},
                {"id": "pork_belly_salt_pepper", "name_th": "หมูสามชั้นคั่วพริกเกลือ", "name_en": "Salt & Pepper Pork Belly", "price": 100, "currency": "THB"},
                {"id": "salt_pepper_shrimp_squid", "name_th": "คั่วพริกเกลือ กุ้ง/ปลาหมึก", "name_en": "Salt & Pepper Shrimp/Squid", "price": 120, "currency": "THB"},
                {"id": "pad_cha_pork_beef_chicken", "name_th": "ผัดฉ่า หมู/เนื้อ/ไก่", "name_en": "Spicy Stir-fried Pork/Beef/Chicken", "price": 100, "currency": "THB"},
                {"id": "pad_cha_shrimp_squid_seafood", "name_th": "ผัดฉ่า กุ้ง/ปลาหมึก/ทะเล", "name_en": "Spicy Stir-fried Shrimp/Squid/Seafood", "price": 120, "currency": "THB"},
                {"id": "pad_kale_pork", "name_th": "ผัดคะน้า หมูชิ้น/หมูสับ", "name_en": "Stir-fried Kale with Pork", "price": 100, "currency": "THB"},
                {"id": "pad_phet_pork_beef_chicken", "name_th": "ผัดเผ็ด หมู/เนื้อ/ไก่", "name_en": "Spicy Stir-fried Pork/Beef/Chicken", "price": 100, "currency": "THB"},
                {"id": "pad_phet_shrimp_squid_seafood", "name_th": "ผัดเผ็ด กุ้ง/ปลาหมึก/ทะเล", "name_en": "Spicy Stir-fried Shrimp/Squid/Seafood", "price": 120, "currency": "THB"},
                {"id": "pad_prik_pao_pork_beef_chicken", "name_th": "ผัดพริกเผา หมู/เนื้อ/ไก่", "name_en": "Chili Paste Stir-fried Pork/Beef/Chicken", "price": 100, "currency": "THB"},
                {"id": "pad_prik_pao_shrimp_squid_seafood", "name_th": "ผัดพริกเผา กุ้ง/ปลาหมึก/ทะเล", "name_en": "Chili Paste Stir-fried Shrimp/Squid/Seafood", "price": 120, "currency": "THB"},
                {"id": "pad_curry_powder_shrimp_squid", "name_th": "ผัดผงกะหรี่ กุ้ง/ปลาหมึก", "name_en": "Curry Powder Stir-fried Shrimp/Squid", "price": 120, "currency": "THB"},
                {"id": "pad_banana_blossom", "name_th": "กล่ำปลีผัดน้ำปลา", "name_en": "Stir-fried Banana Blossom in Fish Sauce", "price": 80, "currency": "THB"},
                {"id": "pad_mixed_vegetables", "name_th": "ผัดผักรวม หมู/กุ้ง", "name_en": "Stir-fried Mixed Vegetables with Pork/Shrimp", "price": 100, "currency": "THB"},
                {"id": "pad_glass_noodles", "name_th": "ผัดวุ้นเส้น", "name_en": "Stir-fried Glass Noodles", "price": 100, "currency": "THB"},
                {"id": "pad_bitter_melon_egg", "name_th": "มะระผัดไข่", "name_en": "Stir-fried Bitter Melon with Egg", "price": 100, "currency": "THB"},
                {"id": "pad_fermented_pork_egg", "name_th": "แหนมผัดไข่", "name_en": "Stir-fried Fermented Pork with Egg", "price": 100, "currency": "THB"}
            ]
        },
        {
            "category_id": "side_dishes_fried",
            "name_th": "กับข้าว - ประเภททอด",
            "name_en": "Side Dishes - Fried",
            "items": [
                {"id": "fried_pork_belly_fish_sauce", "name_th": "หมูสามชั้นทอดน้ำปลา", "name_en": "Fried Pork Belly in Fish Sauce", "price": 100, "currency": "THB", "popular": True},
                {"id": "fried_chicken_wings_fish_sauce", "name_th": "ปีกไก่ทอดน้ำปลา", "name_en": "Fried Chicken Wings in Fish Sauce", "price": 100, "currency": "THB"},
                {"id": "fried_squid_fish_sauce", "name_th": "ปลาหมึกทอดน้ำปลา", "name_en": "Fried Squid in Fish Sauce", "price": 120, "currency": "THB"},
                {"id": "fried_garlic_pork", "name_th": "หมูทอดกระเทียม", "name_en": "Garlic Fried Pork", "price": 100, "currency": "THB"},
                {"id": "fried_garlic_shrimp_squid", "name_th": "ทอดกระเทียม กุ้ง/ปลาหมึก", "name_en": "Garlic Fried Shrimp/Squid", "price": 120, "currency": "THB"},
                {"id": "fried_salted_chicken", "name_th": "ไก่ทอดเกลือ", "name_en": "Salted Fried Chicken", "price": 100, "currency": "THB"},
                {"id": "pork_omelet", "name_th": "ไข่เจียวหมูสับ", "name_en": "Pork Omelet", "price": 100, "currency": "THB"},
                {"id": "shrimp_omelet", "name_th": "ไข่เจียวกุ้งสับ", "name_en": "Shrimp Omelet", "price": 100, "currency": "THB"},
                {"id": "fermented_pork_omelet", "name_th": "ไข่เจียวแหนม", "name_en": "Fermented Pork Omelet", "price": 100, "currency": "THB"},
                {"id": "fried_chicken_tendon", "name_th": "เอ็นไก่ทอด", "name_en": "Fried Chicken Tendon", "price": 100, "currency": "THB"}
            ]
        },
        {
            "category_id": "side_dishes_salad",
            "name_th": "กับข้าว - ประเภทยำ",
            "name_en": "Side Dishes - Salad",
            "items": [
                {"id": "yam_glass_noodles", "name_th": "ยำวุ้นเส้น หมูสับ กุ้ง", "name_en": "Glass Noodles Salad with Pork/Shrimp", "price": 100, "currency": "THB"},
                {"id": "yam_instant_noodles", "name_th": "ยำมาม่า หมูสับ กุ้ง", "name_en": "Instant Noodles Salad with Pork/Shrimp", "price": 100, "currency": "THB"},
                {"id": "yam_tuna_salad", "name_th": "ยำสลัดทูน่า", "name_en": "Tuna Salad", "price": 120, "currency": "THB"},
                {"id": "yam_fried_mushroom", "name_th": "ยำเห็ดเข็มทองทอดกรอบ", "name_en": "Crispy Fried Golden Needle Mushroom Salad", "price": 120, "currency": "THB"},
                {"id": "shrimp_fish_sauce", "name_th": "กุ้งแช่น้ำปลา", "name_en": "Shrimp in Fish Sauce", "price": 120, "currency": "THB"},
                {"id": "pork_lime", "name_th": "หมูมะนาว", "name_en": "Pork with Lime", "price": 100, "currency": "THB"}
            ]
        },
        {
            "category_id": "side_dishes_soup",
            "name_th": "กับข้าว - ประเภทน้ำ",
            "name_en": "Side Dishes - Soup",
            "items": [
                {"id": "green_curry", "name_th": "แกงเขียวหวาน หมู/ไก่/เนื้อ", "name_en": "Green Curry with Pork/Chicken/Beef", "price": 150, "currency": "THB"},
                {"id": "red_curry", "name_th": "แกงเผ็ด หมู/ไก่/เนื้อ", "name_en": "Red Curry with Pork/Chicken/Beef", "price": 150, "currency": "THB"},
                {"id": "jungle_curry", "name_th": "แกงป่า หมู/ไก่/เนื้อ", "name_en": "Jungle Curry with Pork/Chicken/Beef", "price": 150, "currency": "THB"},
                {"id": "tom_kha", "name_th": "ต้มข่า หมู/ไก่", "name_en": "Tom Kha (Coconut Soup) with Pork/Chicken", "price": 150, "currency": "THB"},
                {"id": "tom_yum_goong_creamy", "name_th": "ต้มยำน้ำข้น กุ้ง/ปลาหมึก/ทะเล", "name_en": "Tom Yum Goong Creamy with Shrimp/Squid/Seafood", "price": 150, "currency": "THB", "popular": True},
                {"id": "tom_yum_clear", "name_th": "ต้มยำน้ำใส กุ้ง/ปลาหมึก/ทะเล", "name_en": "Tom Yum Clear with Shrimp/Squid/Seafood", "price": 150, "currency": "THB"},
                {"id": "clear_soup_egg", "name_th": "ต้มจืดไข่น้ำ", "name_en": "Clear Soup with Egg", "price": 100, "currency": "THB"},
                {"id": "clear_soup_cabbage_tofu", "name_th": "ต้มจืดผักกาดขาวเต้าหู้หมูสับ", "name_en": "Clear Soup with Cabbage, Tofu & Pork", "price": 100, "currency": "THB"}
            ]
        },
        {
            "category_id": "snacks",
            "name_th": "อาหารทานเล่น",
            "name_en": "Snacks",
            "items": [
                {"id": "french_fries", "name_th": "เฟรนฟรายส์", "name_en": "French Fries", "price": 59, "currency": "THB"},
                {"id": "nuggets", "name_th": "นักเก็ต", "name_en": "Nuggets", "price": 59, "currency": "THB"},
                {"id": "chicken_popcorn", "name_th": "ไก่ป๊อป", "name_en": "Chicken Popcorn", "price": 59, "currency": "THB"},
                {"id": "cheese_balls", "name_th": "ชีสบอล", "name_en": "Cheese Balls", "price": 79, "currency": "THB"},
                {"id": "shrimp_donuts", "name_th": "โดนัทกุ้ง", "name_en": "Shrimp Donuts", "price": 89, "currency": "THB"}
            ]
        },
        {
            "category_id": "coffee",
            "name_th": "เครื่องดื่ม - กาแฟ",
            "name_en": "Beverages - Coffee",
            "items": [
                {"id": "espresso", "name_th": "เอสเพรสโซ่", "name_en": "Espresso", "price": 60, "currency": "THB"},
                {"id": "latte", "name_th": "ลาเต้", "name_en": "Latte", "price": 60, "currency": "THB", "popular": True},
                {"id": "cappuccino", "name_th": "คาปูชิโน่", "name_en": "Cappuccino", "price": 60, "currency": "THB"},
                {"id": "caramel_macchiato", "name_th": "คาราเมลมัคคิอาโต้", "name_en": "Caramel Macchiato", "price": 60, "currency": "THB"},
                {"id": "mocha", "name_th": "มอคค่า", "name_en": "Mocha", "price": 60, "currency": "THB"},
                {"id": "americano", "name_th": "อเมริกาโน่", "name_en": "Americano", "price": 60, "currency": "THB", "popular": True},
                {"id": "americano_orange", "name_th": "อเมริกาโน่ ส้ม", "name_en": "Orange Americano", "price": 60, "currency": "THB"},
                {"id": "americano_coconut", "name_th": "อเมริกาโน่ มะพร้าว", "name_en": "Coconut Americano", "price": 60, "currency": "THB"},
                {"id": "americano_honey", "name_th": "อเมริกาโน่ น้ำผึ้ง", "name_en": "Honey Americano", "price": 60, "currency": "THB"},
                {"id": "americano_honey_lime", "name_th": "อเมริกาโน่ น้ำผึ้งมะนาว", "name_en": "Honey Lime Americano", "price": 60, "currency": "THB"}
            ]
        },
        {
            "category_id": "tea",
            "name_th": "เครื่องดื่ม - ชา",
            "name_en": "Beverages - Tea",
            "items": [
                {"id": "thai_tea", "name_th": "ชาไทย", "name_en": "Thai Tea", "price": 60, "currency": "THB"},
                {"id": "green_tea", "name_th": "ชาเขียว", "name_en": "Green Tea", "price": 60, "currency": "THB"},
                {"id": "thai_tea_no_color", "name_th": "ชาไทยไม่ใส่สี", "name_en": "Thai Tea (No Color)", "price": 60, "currency": "THB"},
                {"id": "iced_black_tea", "name_th": "ชาดำเย็น", "name_en": "Iced Black Tea", "price": 60, "currency": "THB"},
                {"id": "lime_tea", "name_th": "ชามะนาว", "name_en": "Lime Tea", "price": 60, "currency": "THB"},
                {"id": "thai_tea_strawberry", "name_th": "ชาไทยสตรอเบอรี่", "name_en": "Thai Tea Strawberry", "price": 60, "currency": "THB"},
                {"id": "green_tea_strawberry", "name_th": "ชาเขียวสตรอเบอรี่", "name_en": "Green Tea Strawberry", "price": 60, "currency": "THB"}
            ]
        },
        {
            "category_id": "matcha",
            "name_th": "เครื่องดื่ม - มัทฉะ",
            "name_en": "Beverages - Matcha",
            "items": [
                {"id": "matcha_latte", "name_th": "มัทฉะลาเต้", "name_en": "Matcha Latte", "price": 65, "currency": "THB"},
                {"id": "matcha_strawberry", "name_th": "มัทฉะสตรอเบอรี่", "name_en": "Matcha Strawberry", "price": 65, "currency": "THB"},
                {"id": "matcha_coconut", "name_th": "มัทฉะมะพร้าว", "name_en": "Matcha Coconut", "price": 65, "currency": "THB"},
                {"id": "pure_matcha", "name_th": "เพียวมัทฉะ", "name_en": "Pure Matcha", "price": 65, "currency": "THB"}
            ]
        },
        {
            "category_id": "cocoa",
            "name_th": "เครื่องดื่ม - โกโก้",
            "name_en": "Beverages - Cocoa",
            "items": [
                {"id": "cocoa", "name_th": "โกโก้", "name_en": "Cocoa", "price": 60, "currency": "THB"},
                {"id": "cocoa_thai_tea", "name_th": "โกโก้ชาไทย", "name_en": "Cocoa Thai Tea", "price": 60, "currency": "THB"},
                {"id": "cocoa_green_tea", "name_th": "โกโก้ชาเขียว", "name_en": "Cocoa Green Tea", "price": 60, "currency": "THB"},
                {"id": "cocoa_strawberry", "name_th": "โกโก้สตรอเบอรี่", "name_en": "Cocoa Strawberry", "price": 60, "currency": "THB"}
            ]
        },
        {
            "category_id": "milk",
            "name_th": "เครื่องดื่ม - นม",
            "name_en": "Beverages - Milk",
            "items": [
                {"id": "fresh_milk_iced", "name_th": "นมสดเย็น", "name_en": "Iced Fresh Milk", "price": 60, "currency": "THB"},
                {"id": "fresh_milk_caramel", "name_th": "นมสดคาราเมล", "name_en": "Caramel Fresh Milk", "price": 60, "currency": "THB"},
                {"id": "fresh_milk_strawberry", "name_th": "นมสดสตรอเบอรี่", "name_en": "Strawberry Fresh Milk", "price": 60, "currency": "THB"},
                {"id": "pink_milk", "name_th": "นมชมพู", "name_en": "Pink Milk", "price": 60, "currency": "THB"},
                {"id": "green_milk", "name_th": "นมมรกต", "name_en": "Green Milk", "price": 60, "currency": "THB"}
            ]
        },
        {
            "category_id": "italian_soda",
            "name_th": "เครื่องดื่ม - อิตาเลียนโซดา",
            "name_en": "Beverages - Italian Soda",
            "items": [
                {"id": "blue_lemon_soda", "name_th": "บลูเลม่อนโซดา", "name_en": "Blue Lemon Soda", "price": 50, "currency": "THB"},
                {"id": "blueberry_soda", "name_th": "บลูเบอรี่โซดา", "name_en": "Blueberry Soda", "price": 50, "currency": "THB"},
                {"id": "strawberry_soda", "name_th": "สตรอเบอรี่โซดา", "name_en": "Strawberry Soda", "price": 50, "currency": "THB"},
                {"id": "lychee_soda", "name_th": "ลิ้นจี่โซดา", "name_en": "Lychee Soda", "price": 50, "currency": "THB"},
                {"id": "passion_fruit_soda", "name_th": "เสาวรสโซดา", "name_en": "Passion Fruit Soda", "price": 50, "currency": "THB"},
                {"id": "apple_soda", "name_th": "แอปเปิ้ลโซดา", "name_en": "Apple Soda", "price": 50, "currency": "THB"},
                {"id": "mango_soda", "name_th": "มะม่วงโซดา", "name_en": "Mango Soda", "price": 50, "currency": "THB"},
                {"id": "honey_lime_soda", "name_th": "น้ำผึ้งมะนาวโซดา", "name_en": "Honey Lime Soda", "price": 50, "currency": "THB"},
                {"id": "red_lime_soda", "name_th": "แดงมะนาวโซดา", "name_en": "Red Lime Soda", "price": 50, "currency": "THB"},
                {"id": "red_soda", "name_th": "แดงโซดา", "name_en": "Red Soda", "price": 50, "currency": "THB"}
            ]
        },
        {
            "category_id": "toppings",
            "name_th": "เพิ่มท็อปปิ้ง",
            "name_en": "Add Toppings",
            "items": [
                {"id": "lychee_pop", "name_th": "ลิ้นจี่ป๊อป", "name_en": "Lychee Popping Boba", "price": 10, "currency": "THB"},
                {"id": "mango_pop", "name_th": "มะม่วงป๊อป", "name_en": "Mango Popping Boba", "price": 10, "currency": "THB"},
                {"id": "blueberry_pop", "name_th": "บลูเบอรี่ป๊อป", "name_en": "Blueberry Popping Boba", "price": 10, "currency": "THB"}
            ]
        },
        {
            "category_id": "other_beverages",
            "name_th": "เครื่องดื่มอื่นๆ",
            "name_en": "Other Beverages",
            "items": [
                {"id": "water", "name_th": "น้ำเปล่า ขวดเล็ก/ขวดใหญ่", "name_en": "Water (Small/Large Bottle)", "price": "10/20", "currency": "THB"},
                {"id": "coke_zero", "name_th": "โค้กซีโร่", "name_en": "Coke Zero", "price": 15, "currency": "THB"},
                {"id": "soft_drinks", "name_th": "โค้ก แฟนต้าส้ม แฟนต้าเขียว", "name_en": "Coke, Fanta Orange, Fanta Green", "price": 15, "currency": "THB"},
                {"id": "pepsi_large", "name_th": "เป๊ปซี่ขวดใหญ่", "name_en": "Pepsi Large Bottle", "price": 30, "currency": "THB"},
                {"id": "beer_singha", "name_th": "เบียร์สิงห์", "name_en": "Singha Beer", "price": 90, "currency": "THB"},
                {"id": "beer_leo", "name_th": "เบียร์ลีโอ", "name_en": "Leo Beer", "price": 80, "currency": "THB"},
                {"id": "beer_budweiser", "name_th": "เบียร์บัดไวเซอร์", "name_en": "Budweiser Beer", "price": 65, "currency": "THB"},
                {"id": "beer_heineken", "name_th": "เบียร์ไฮเนเก้น", "name_en": "Heineken Beer", "price": 70, "currency": "THB"}
            ]
        },
        {
            "category_id": "toast",
            "name_th": "ขนม - ขนมปังปิ้ง",
            "name_en": "Snacks - Toast",
            "items": [
                {"id": "toast_butter_milk", "name_th": "ขนมปังปิ้ง เนย นม", "name_en": "Toast with Butter & Milk", "price": 39, "currency": "THB"},
                {"id": "toast_butter_milk_sugar", "name_th": "ขนมปังปิ้ง เนย นม น้ำตาล", "name_en": "Toast with Butter, Milk & Sugar", "price": 39, "currency": "THB"},
                {"id": "toast_nutella", "name_th": "ขนมปังปิ้ง นูเทลล่า", "name_en": "Toast with Nutella", "price": 49, "currency": "THB"},
                {"id": "toast_peanut_butter", "name_th": "ขนมปังปิ้ง เนยถั่ว", "name_en": "Toast with Peanut Butter", "price": 49, "currency": "THB"},
                {"id": "toast_custard", "name_th": "ขนมปังปิ้ง สังขยา", "name_en": "Toast with Custard", "price": 49, "currency": "THB"},
                {"id": "toast_strawberry_jam", "name_th": "ขนมปังปิ้ง แยมสตรอเบอรี่", "name_en": "Toast with Strawberry Jam", "price": 49, "currency": "THB"},
                {"id": "toast_whip_cream", "name_th": "ขนมปังปิ้ง วิปครีม", "name_en": "Toast with Whip Cream", "price": 49, "currency": "THB"}
            ]
        }
    ],
    "menu_highlights": {
        "best_sellers": [
            "rice_kaprao_pork_beef_chicken",
            "rice_kaprao_squid_shrimp_seafood",
            "rice_pork_belly_salt_pepper",
            "rice_fried_pork_belly_fish_sauce",
            "pad_kaprao_pork_beef_chicken",
            "pad_kaprao_shrimp_squid_seafood",
            "fried_pork_belly_fish_sauce",
            "tom_yum_goong_creamy",
            "latte",
            "americano",
            "pad_kee_mao_noodles"
        ],
        "total_items": 160
    },
    "dietary_info": {
        "vegetarian_available": True,
        "halal_certified": False,
        "pork_free_options": True,
        "seafood_available": True,
        "spicy_adjustable": True,
        "allergen_info_available": True
    }
}

# แทนที่ข้อมูลเมนู
data['menus'] = new_menus

# บันทึกไฟล์
with open('farm_aroi_kb.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✅ อัพเดตเมนูเรียบร้อยแล้ว!")
print(f"📊 จำนวนหมวดหมู่เมนู: {len(new_menus['categories'])}")
total = sum(len(cat['items']) for cat in new_menus['categories'])
print(f"📋 จำนวนเมนูทั้งหมด: {total} รายการ")

