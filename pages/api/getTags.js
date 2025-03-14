import prisma from '../../lib/prisma_lib';
    
export default async function handler(req, res) {
    const items = await prisma.tag.findMany({
        // select: {
        //     id: true,
        //     name: true, // Adjust based on your schema
        // },
    });
    res.status(200).json(items);
}