const expect = require('chai').expect;
const dbHandler = require('./db-handler');
const User = require('../../models/User');
const passport = require('passport');

describe('User', () => {
    before(async () => await dbHandler.connect());

    afterEach(async () => await dbHandler.clearDatabase());

    after(async () => await dbHandler.closeDatabase());

    it('can be create correctly', async () => {
        const login = 'test';
        const password = 'test';

        const user = new User({
            login
        });
        user.setPassword(password);
        await user.save();

        const findUser = await User.findOne({login}).exec();

        expect(findUser).to.exist;
        expect(findUser.login).to.equal(login);
        expect(findUser.validatePassword(password)).to.true;
    });

    it('can be create correctly many users', async () => {
        const loginPlaceholder = 'test';
        const passwordPlaceholder = 'test';
        const userCount = 5;

        for (let i = 0; i < userCount; i++) {
            const login = loginPlaceholder + i;
            const password = passwordPlaceholder + i;
            const user = new User({login});
            user.setPassword(password);
            await user.save();
        }

        for (let i = 0; i < userCount; i++) {
            const login = loginPlaceholder + i;
            const password = passwordPlaceholder + i;
            const findUser = await User.findOne({login}).exec();

            expect(findUser).to.exist;
            expect(findUser.login).to.equal(login);
            expect(findUser.validatePassword(password)).to.true;

        }
    });

    it('cannot create uncorrect model', async () => {
        const user = new User();

        await user.save((err) => {
            expect(err).to.exist;
            expect(err.name).to.equal('ValidationError');
        });
    });
})