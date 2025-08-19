import prisma from '@prisma_module/prisma.module';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

    switch ( method ) {
        case "GET":
            try {
                const tag = await prisma.tag.findUnique({
                    where: {
                        id: parseInt(id)
                    }
                })
                res.status(200).send({ 
                    success: true,
                    data: tag
                });
            } catch (e){
                res.status(400).send({ 
                    success: false,
                    data: e
                });
                return;
            }
        case "DELETE":
            try {
                const deleteTag = await prisma.tag.delete({
                    where: {
                        id: parseInt(id)
                    },
                })

				return res.status(200).json({
					success: true,
					data: deleteTag
				});

            } catch (e) {
                res.status(400).send({ 
                    success: false, 
                    data: e
                });
                return;
            }
        default:
            res.status(400).send({ status: "invalid request" });
    }
}