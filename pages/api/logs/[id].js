import formidable from 'formidable';
import { firstValues } from "formidable/src/helpers/firstValues.js";
import * as yup from "yup";
import { object, string, number, date, InferType } from 'yup';
import prisma from '../../../lib/prisma_lib';
import { Prisma } from '@prisma/client';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

    switch ( method ) {
        case "GET":
            try {
                const log = await prisma.log.findUnique({
                    where: {
                        id: parseInt(id)
                    }
                })
                res.status(200).send({ 
                    success: true,
                    data: log
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
                const deleteLog = await prisma.log.delete({
                    where: {
                        id: parseInt(id)
                    },
                })

				return res.status(200).json({
					success: true,
					data: deleteLog
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