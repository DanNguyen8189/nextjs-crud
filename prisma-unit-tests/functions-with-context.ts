// Prisma unit testing
import { Context } from './context'

interface createLog {
    id: number
    userId: number
    title: string
    description: string
    //tags: createTag[]

//   id      Int     @id @default(autoincrement())
//   user    User    @relation(fields: [userId], references: [id])
//   userId  Int     // relation scalar field  (used in the `@relation` attribute above)
//   title   String
//   description  String?
//   tags    Tag[]
}

interface createTag {
    name: string
    //logs: createLog[]
}

export async function createLog(log: createLog, ctx: Context) {
    if (log.title != "") {
        // return await ctx.prisma.log.create({
        //     data: {
        //         userId: 1,
        //         title: "",
        //         description: "",
        //     }
        // })
        return await ctx.prisma.log.create({
            data: log,
        })
    } else {
        return new Error('Log title cannot be empty')
    }
}

export async function createTag(tag: createTag, ctx: Context) {
    if (tag.name != "") {
        // return await ctx.prisma.log.create({
        //     data: {
        //         userId: 1,
        //         title: "",
        //         description: "",
        //     }
        // })
        return await ctx.prisma.tag.create({
            data: tag,
        })
    } else {
        return new Error('Tag name cannot be empty')
    }
}