// Prisma unit testing
import { MockContext, Context, createMockContext } from '../context'
import { createLog, createTag } from '../functions-with-context'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

test('should create new log ', async () => {
    const log = {
        id: 1,
        userId: 1,
        title: 'Rich',
        description: 'hello@prisma.io',
    }
    mockCtx.prisma.log.create.mockResolvedValue(log)

    await expect(createLog(log, ctx)).resolves.toEqual({
        id: 1,
        userId: 1,
        title: 'Rich',
        description: 'hello@prisma.io',
    })
})

test('should create new tag ', async () => {
    const tag = {
        id: 1,
        name: 'Yikes',
        description: '',
    }
    mockCtx.prisma.tag.create.mockResolvedValue(tag)

    await expect(createTag(tag, ctx)).resolves.toEqual({
        id: 1,
        name: 'Yikes',
        description: '',
    })
})