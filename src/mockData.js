<<<<<<< HEAD
import food_1Image from './assets/food_1.png';
import food_2Image from './assets/food_2.png';
import food_3Image from './assets/food_3.png';
import food_4Image from './assets/food_4.png';
import food_5Image from './assets/food_5.png';
import food_6Image from './assets/food_6.png';

=======
>>>>>>> origin/main
export const chefs = [
  {
    id: 'chef-1',
    name: 'Aisha Sharma',
    specialty: 'North Indian Comfort',
    rating: 4.9,
    dishesCount: 24,
    avatar:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'chef-2',
    name: 'Rohan Patel',
    specialty: 'Gujarati Thali',
    rating: 4.8,
    dishesCount: 18,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'chef-3',
    name: 'Sara Ali',
    specialty: 'Healthy Bowls',
    rating: 4.7,
    dishesCount: 15,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'chef-4',
    name: 'Meera Nair',
    specialty: 'Kerala Home Style',
    rating: 4.9,
    dishesCount: 20,
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'
  }
];

export const dishes = [
  {
    id: 'dish-1',
    name: 'Paneer Tikka Masala',
    price: 320,
    isVeg: true,
    mealTypes: ['Lunch', 'Dinner'],
    preOrderAvailable: true,
    chefId: 'chef-1',
<<<<<<< HEAD
    image: food_1Image,
=======
    image:
      'https://images.unsplash.com/photo-1559050019-6b509a68e480?auto=format&fit=crop&w=800&q=80',
>>>>>>> origin/main
    description: 'Char-grilled paneer in a silky tomato-cashew gravy.',
    ingredients: ['Paneer', 'Tomato', 'Cashew', 'Spices'],
    calories: 480
  },
  {
    id: 'dish-2',
    name: 'Gujarati Undhiyu',
    price: 280,
    isVeg: true,
    mealTypes: ['Lunch', 'Dinner'],
    preOrderAvailable: true,
    chefId: 'chef-2',
<<<<<<< HEAD
    image: food_2Image,
=======
    image:
      'https://images.unsplash.com/photo-1604908177010-ca17a4be0f1b?auto=format&fit=crop&w=800&q=80',
>>>>>>> origin/main
    description: 'Winter-special slow cooked mixed vegetables and methi muthia.',
    ingredients: ['Veggies', 'Methi Muthia', 'Spices'],
    calories: 410
  },
  {
    id: 'dish-3',
    name: 'Malabar Prawn Curry',
    price: 420,
    isVeg: false,
    mealTypes: ['Dinner'],
    preOrderAvailable: true,
    chefId: 'chef-4',
<<<<<<< HEAD
    image: food_3Image,
=======
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
>>>>>>> origin/main
    description: 'Coconut-based curry with fresh prawns and curry leaves.',
    ingredients: ['Prawns', 'Coconut', 'Curry Leaves', 'Spices'],
    calories: 520
  },
  {
    id: 'dish-4',
    name: 'Tandoori Chicken Meal',
    price: 360,
    isVeg: false,
    mealTypes: ['Lunch', 'Dinner'],
    preOrderAvailable: true,
    chefId: 'chef-1',
<<<<<<< HEAD
    image: food_4Image,
=======
    image:
      'https://images.unsplash.com/photo-1604908177225-0ac1c9f9f369?auto=format&fit=crop&w=800&q=80',
>>>>>>> origin/main
    description: 'Smoky tandoori chicken with mint chutney and salad.',
    ingredients: ['Chicken', 'Yogurt', 'Spices', 'Mint'],
    calories: 560
  },
  {
    id: 'dish-5',
    name: 'Buddha Bowl',
    price: 250,
    isVeg: true,
    mealTypes: ['Lunch'],
    preOrderAvailable: true,
    chefId: 'chef-3',
<<<<<<< HEAD
    image: food_5Image,
=======
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
>>>>>>> origin/main
    description: 'Colorful bowl with quinoa, roasted veggies, hummus, and greens.',
    ingredients: ['Quinoa', 'Chickpeas', 'Veggies', 'Tahini'],
    calories: 420
  },
  {
    id: 'dish-6',
    name: 'Kerala Fish Curry',
    price: 400,
    isVeg: false,
    mealTypes: ['Dinner'],
    preOrderAvailable: true,
    chefId: 'chef-4',
<<<<<<< HEAD
    image: food_6Image,
=======
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
>>>>>>> origin/main
    description: 'Tangy tamarind and coconut based fish curry from Kerala.',
    ingredients: ['Fish', 'Coconut', 'Tamarind', 'Spices'],
    calories: 530
  }
];

export const mockOrders = [
  {
    id: 'order-1',
    customer: 'Priya',
    dish: 'Paneer Tikka Masala',
    status: 'Pending',
    amount: 320,
    time: 'Today, 7:30 PM'
  },
  {
    id: 'order-2',
    customer: 'Karan',
    dish: 'Gujarati Undhiyu',
    status: 'Pending',
    amount: 280,
    time: 'Today, 8:00 PM'
  }
<<<<<<< HEAD
];
=======
];


>>>>>>> origin/main
