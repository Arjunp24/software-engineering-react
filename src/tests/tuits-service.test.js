/**
 * @jest-environment node
 */
import {createTuit, deleteTuit, findTuitById, findAllTuits} from "../services/tuits-service";
import {
    createUser,
    deleteUsersByUsername,
    findAllUsers,
    findIdByUsername,
    findUserById
} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // TODO: implement this
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const sampleTuit = {
        tuit: 'tuit 1',
        postedBy: ripley.username
    };

    let newTuit;

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return createUser(ripley);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuit(newTuit._id);
        return deleteUsersByUsername(ripley.username);
    })

    test('can create tuit with REST API', async () => {
        // insert new user in the database
        newTuit = await createTuit(sampleTuit);
        // verify inserted user's properties match parameter user
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
    });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    const sampleTuit = {
        tuit: 'some content',
        postedBy: sowell.username
    }

    let newTuit;

    // setup the tests before verification
    beforeAll(async () => {
        // insert the sample user we then try to remove
        newTuit = await createTuit(sampleTuit);
        return newTuit;
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuit(newTuit._id);
    })

    test('can delete users from REST API by username', async () => {
        // delete a user by their username. Assumes user already exists
        const status = await deleteTuit(newTuit._id);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    const sampleTuit = {
        tuit: 'some content',
        postedBy: adam.username
    }

    let newTuit;

    // setup before running test
    beforeAll(async () => {
        // clean up before the test making sure the user doesn't already exist
        newTuit = await createTuit(sampleTuit);
        return newTuit
    });

    // clean up after ourselves
    afterAll(() => {
        // remove any data we inserted
        return deleteTuit(newTuit._id)
    });

    test('can retrieve user from REST API by primary key', async () => {
        // retrieve the user from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved user matches parameter user
        expect(existingTuit.tuit).toEqual(sampleTuit.tuit);
        expect(existingTuit.postedBy).toEqual(sampleTuit.postedBy);
    });
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
    const username = "larry";

    const tuits = [
        "tuit 1", "tuit 2", "tuit 3"
    ];

    let createdTuits;

    // setup data before test
    beforeAll( () =>
        // insert several known users
        createdTuits = Promise.all(tuits.map(tuit =>
            createTuit({
                tuit: tuit,
                postedBy: username
            })
        ))
    );

    // clean up after ourselves
    afterAll(() =>
        // delete the users we inserted
        Promise.all(createdTuits.map(t =>
            deleteTuit(t._id)
        ))
    );

    test('can retrieve all users from REST API', async () => {
        // retrieve all the users
        const allTuits = await findAllTuits();

        // there should be a minimum number of users
        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // let's check each user we inserted
        const tuitsWeInserted = allTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(t => {
            const tuit = tuits.find(username => username === t.tuit);
            expect(t.tuit).toEqual(tuit);
            expect(t.postedBy).toEqual(username);
        });
    });
});