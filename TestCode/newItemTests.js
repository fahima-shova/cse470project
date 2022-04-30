let chai = require("chai");
let chaiHttp = require("chai-http");

let server = require("../index.js");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("TEST NEW ITEM API", () => {

  describe("GET /newItems", () => {
    it("It should GET all the Slider Items", (done) => {
      chai
        .request(server)
        .get("/newItems")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("It should NOT GET all the Slider Items", (done) => {
      chai
        .request(server)
        .get("/newItem")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });



  // post a new item
  describe("POST /sliderItems/addItem", () => {
    it("It should POST a new item", (done) => {
      const item = {
        name: "new item",
        price: 5,
        img: "image.jpg",
      };
      chai
        .request(server)
        .post("/newItems/addItem")
        .send(item)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("Should return 404 if try to post into a wrong path", (done) => {
      chai
        .request(server)
        .post("/newItems/add")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
      //Test DELETE API
      describe("DELETE /newItems/:id", () => {
        it("It should delete a new Item and return 200", (done) => {
            const itemId = "625c422714a10d1360625eef";
            chai.request(server)                
                .delete("/newItems/" + itemId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
  
        it("It should not delete a new Item and return 500", (done) => {
          const itemId = "123";
          chai.request(server)                
              .delete("/newItems/" + itemId)
              .end((err, response) => {
                  response.should.have.status(500);
              done();
              });
      });
  })
      //Test GET NEW ITEM BY ID API
      describe("GET /newItems/:id", () => {
        it("It should get a new Item by Id and return 200", (done) => {
            const itemId = "625c422714a10d1360625eef";
            chai.request(server)                
                .get("/newItems/" + itemId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
  
        it("It should not get a new Item and return 500", (done) => {
          const itemId = "123";
          chai.request(server)                
              .get("/newItems/" + itemId)
              .end((err, response) => {
                  response.should.have.status(500);
              done();
              });
      });
  })

});
