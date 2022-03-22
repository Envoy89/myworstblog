const expect = require('chai').expect;
const dbHandler = require('./db-handler');
const Tag = require('../../models/Tag');

describe('Tag', () => {
    before(async () => await dbHandler.connect()); 

    afterEach(async () => await dbHandler.clearDatabase());

    after(async () => await dbHandler.closeDatabase());

    it('can be created correctly', async () => {
        const name = 'test';

        const tag = new Tag({
            name
        });
        await tag.save();

        const findTag = await Tag.findOne({name}).exec();

        expect(findTag).to.exist;
        expect(findTag.name).to.equal("1234");
    });

    it('can be create correctly many tags', async () => {
        const namePlaceholder = 'test';

        const tagCount = 5;

        const tags = [];
        for (let i = 0; i < tagCount; i++) {
            const tag = new Tag({
                name: namePlaceholder + i
            });

            await tag.save();
        }

        for (let i = 0; i < tagCount; i++) {
            const name = namePlaceholder + i;
            
            const findTag = await Tag.findOne({
                name
            }).exec();

            expect(findTag).to.exist;
            expect(findTag.name).to.equal(name);
        }
    });
})