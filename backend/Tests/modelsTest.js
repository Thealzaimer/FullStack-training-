pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("Each object in the response array has a valid price value", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');

    responseData.forEach(function (object) {
        pm.expect(object.price).to.be.a('number').and.to.be.at.least(0);
    });
});


pm.test("Verify that __v field is present in each object in the response array", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array').that.is.not.empty;

    responseData.forEach(function (object) {
        pm.expect(object.__v).to.exist;
    });
});




pm.test("Check _id is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');

    responseData.forEach(function (item) {
        pm.expect(item._id).to.be.a('string').and.to.have.lengthOf.at.least(1, "_id should not be empty");
    });
});


pm.test("Title is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.title).to.be.a('string').and.to.not.be.empty;
    });
});


pm.test("Description is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.description).to.be.a('string').and.to.have.lengthOf.at.least(1, "Description should not be empty");
    });
});


pm.test("imageUrl is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array').that.is.not.empty;

    responseData.forEach(function (item) {
        pm.expect(item.imageUrl).to.be.a('string').and.to.have.lengthOf.at.least(1, "imageUrl should not be empty");
    });
});