const expect = require('chai').expect;
const dbHandler = require('./db-handler');
const Topic = require('../../models/Topic');

describe('Topic', () => {
    before(async () => await dbHandler.connect()); 

    afterEach(async () => await dbHandler.clearDatabase());

    after(async () => await dbHandler.closeDatabase());

    it('can be created correctly', async () => {
        const name = 'test';
        const fullText = 'test';

        const topic = new Topic({
            name,
            fullText
        });
        await topic.save();

        const findTopic = await Topic.findOne({name, fullText}).exec();

        expect(findTopic).to.exist;
        expect(findTopic.name).to.equal(name);
        expect(findTopic.fullText).to.equal(fullText);
    });

    it('can be create correctly many topics', async () => {
        const namePlaceholder = 'test';
        const fullTextPlaceHolder = 'test';

        const topicCount = 5;

        const topics = [];
        for (let i = 0; i < topicCount; i++) {
            const topic = new Topic({
                name: namePlaceholder + i,
                fullText: fullTextPlaceHolder + i
            });

            await topic.save();
        }

        for (let i = 0; i < topicCount; i++) {
            const name = namePlaceholder + i;
            const fullText = fullTextPlaceHolder + i;
            const findTopic = await Topic.findOne({
                name,
                fullText
            }).exec();

            expect(findTopic).to.exist;
            expect(findTopic.name).to.equal(name);
            expect(findTopic.fullText).to.equal(fullText);
        }
    });

    it('cannot create uncorrect model', async () => {
        const topic = new Topic();

        await topic.save((err) => {
            expect(err).to.exist;
            expect(err.name).to.equal('ValidationError');
        });
    })

    it('cannot create model without name', async () => {
        const topic = new Topic({fullText: 'test'});

        await topic.save((err) => {
            expect(err).to.exist;
            expect(err.name).to.equal('ValidationError');
        });
    });

    it('cannot create model without fullText', async () => {
        const topic = new Topic({name: 'test'});

        await topic.save((err) => {
            expect(err).to.exist;
            expect(err.name).to.equal('ValidationError');
        });
    });
})