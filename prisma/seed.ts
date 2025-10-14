import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample operators
  const operator1 = await prisma.operator.upsert({
    where: { email: 'carlos.mendoza@portoviejo.ec' },
    update: {},
    create: {
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@portoviejo.ec',
      phone: '(05) 2638-111',
    },
  });

  const operator2 = await prisma.operator.upsert({
    where: { email: 'ana.rodriguez@portoviejo.ec' },
    update: {},
    create: {
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@portoviejo.ec',
      phone: '(05) 2638-222',
    },
  });

  console.log('✅ Operators created:', { operator1: operator1.name, operator2: operator2.name });

  // Create sample owners
  const owner1 = await prisma.owner.upsert({
    where: { email: 'maria.gonzalez@email.com' },
    update: {},
    create: {
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '(05) 2638-5678',
      address: 'Calle Secundaria 456, Portoviejo',
    },
  });

  const owner2 = await prisma.owner.upsert({
    where: { email: 'jose.martinez@email.com' },
    update: {},
    create: {
      name: 'José Martínez',
      email: 'jose.martinez@email.com',
      phone: '(05) 2638-9999',
      address: 'Av. Principal 789, Portoviejo',
    },
  });

  console.log('✅ Owners created:', { owner1: owner1.name, owner2: owner2.name });

  // Create sample recipes
  const recipe1 = await prisma.recipe.upsert({
    where: { id: 'recipe-ceviche-camaron' },
    update: {},
    create: {
      id: 'recipe-ceviche-camaron',
      name: 'Ceviche de Camarón',
      description: 'Ceviche fresco con camarones del día, cebolla, tomate y cilantro',
    },
  });

  const recipe2 = await prisma.recipe.upsert({
    where: { id: 'recipe-encebollado' },
    update: {},
    create: {
      id: 'recipe-encebollado',
      name: 'Encebollado',
      description: 'Sopa tradicional con pescado, yuca, cebolla y achiote',
    },
  });

  const recipe3 = await prisma.recipe.upsert({
    where: { id: 'recipe-bolones' },
    update: {},
    create: {
      id: 'recipe-bolones',
      name: 'Bolones de Verde',
      description: 'Bolas de plátano verde con queso y chicharrón',
    },
  });

  const recipe4 = await prisma.recipe.upsert({
    where: { id: 'recipe-corviche' },
    update: {},
    create: {
      id: 'recipe-corviche',
      name: 'Corviche',
      description: 'Empanada de plátano verde con pescado y maní',
    },
  });

  const recipe5 = await prisma.recipe.upsert({
    where: { id: 'recipe-tigrillo' },
    update: {},
    create: {
      id: 'recipe-tigrillo',
      name: 'Tigrillo',
      description: 'Plátano verde revuelto con huevo, queso y cebolla',
    },
  });

  console.log('✅ Recipes created:', {
    recipe1: recipe1.name,
    recipe2: recipe2.name,
    recipe3: recipe3.name,
    recipe4: recipe4.name,
    recipe5: recipe5.name,
  });

  // Create sample restaurants
  const restaurant1 = await prisma.restaurant.upsert({
    where: { id: 'restaurant-el-buen-sabor' },
    update: {},
    create: {
      id: 'restaurant-el-buen-sabor',
      name: 'El Buen Sabor',
      description: 'Restaurante familiar con comida tradicional',
      history: 'Fundado en 1985 por la familia González, El Buen Sabor ha sido un referente en la cocina tradicional de Portoviejo. Durante más de 35 años, hemos servido los sabores auténticos de la región, manteniendo las recetas familiares que han pasado de generación en generación.',
      address: 'Av. Principal 123, Portoviejo',
      latitude: -1.0547,
      longitude: -80.4545,
      phone: '(05) 2638-1234',
      email: 'contacto@elbuensabor.ec',
      website: 'https://elbuensabor.ec',
      principalImage: 'https://example.com/el-buen-sabor-main.jpg',
      images: [
        'https://example.com/el-buen-sabor-1.jpg',
        'https://example.com/el-buen-sabor-2.jpg',
        'https://example.com/el-buen-sabor-3.jpg',
      ],
      identificationNumber: '1234567890',
      ownerId: owner1.id,
    },
  });

  const restaurant2 = await prisma.restaurant.upsert({
    where: { id: 'restaurant-sabores-del-mar' },
    update: {},
    create: {
      id: 'restaurant-sabores-del-mar',
      name: 'Sabores del Mar',
      description: 'Especialistas en mariscos frescos',
      history: 'Desde 1992, Sabores del Mar se ha especializado en ofrecer los mejores mariscos de la costa ecuatoriana. Nuestro compromiso es servir productos frescos del día, preparados con técnicas tradicionales y un toque moderno.',
      address: 'Malecón 456, Portoviejo',
      latitude: -1.0520,
      longitude: -80.4520,
      phone: '(05) 2638-5555',
      email: 'info@saboresdelmar.ec',
      website: 'https://saboresdelmar.ec',
      principalImage: 'https://example.com/sabores-del-mar-main.jpg',
      images: [
        'https://example.com/sabores-del-mar-1.jpg',
        'https://example.com/sabores-del-mar-2.jpg',
      ],
      identificationNumber: '0987654321',
      ownerId: owner2.id,
    },
  });

  console.log('✅ Restaurants created:', {
    restaurant1: restaurant1.name,
    restaurant2: restaurant2.name,
  });

  // Create restaurant-recipe relationships
  await prisma.restaurantRecipe.upsert({
    where: {
      restaurantId_recipeId: {
        restaurantId: restaurant1.id,
        recipeId: recipe1.id,
      },
    },
    update: {},
    create: {
      restaurantId: restaurant1.id,
      recipeId: recipe1.id,
    },
  });

  await prisma.restaurantRecipe.upsert({
    where: {
      restaurantId_recipeId: {
        restaurantId: restaurant1.id,
        recipeId: recipe2.id,
      },
    },
    update: {},
    create: {
      restaurantId: restaurant1.id,
      recipeId: recipe2.id,
    },
  });

  await prisma.restaurantRecipe.upsert({
    where: {
      restaurantId_recipeId: {
        restaurantId: restaurant1.id,
        recipeId: recipe3.id,
      },
    },
    update: {},
    create: {
      restaurantId: restaurant1.id,
      recipeId: recipe3.id,
    },
  });

  await prisma.restaurantRecipe.upsert({
    where: {
      restaurantId_recipeId: {
        restaurantId: restaurant2.id,
        recipeId: recipe1.id,
      },
    },
    update: {},
    create: {
      restaurantId: restaurant2.id,
      recipeId: recipe1.id,
    },
  });

  await prisma.restaurantRecipe.upsert({
    where: {
      restaurantId_recipeId: {
        restaurantId: restaurant2.id,
        recipeId: recipe4.id,
      },
    },
    update: {},
    create: {
      restaurantId: restaurant2.id,
      recipeId: recipe4.id,
    },
  });

  await prisma.restaurantRecipe.upsert({
    where: {
      restaurantId_recipeId: {
        restaurantId: restaurant2.id,
        recipeId: recipe5.id,
      },
    },
    update: {},
    create: {
      restaurantId: restaurant2.id,
      recipeId: recipe5.id,
    },
  });

  console.log('✅ Restaurant-recipe relationships created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
