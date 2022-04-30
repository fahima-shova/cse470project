let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index.js");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("TEST SLIDER ITEMS API", () => {
  //get slider items
  describe("GET /sliderItems", () => {
    it("It should GET all the Slider Items", (done) => {
      chai
        .request(server)
        .get("/sliderItems")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("It should NOT GET all the Slider Items", (done) => {
      chai
        .request(server)
        .get("/slider")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });



  //post a slider item
  describe("POST /sliderItems/addSliderItem", () => {
    it("It should POST a new item", (done) => {
      const item = {
        img: "String",
        title: "String",
        desc: "String",
        bg: "String",
      };
      chai
        .request(server)
        .post("/sliderItems/addSliderItem")
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
        .post("/sliderItems/wrongPath")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

  });

  //Test DELETE API
  describe("DELETE /sliderItems/:id", () => {
    it("It should DELETE an existing item", (done) => {
        const itemId = "625c422714a10d1360625eef";
        chai.request(server)                
            .delete("/sliderItems/" + itemId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });

            
    });

    it("It should not DELETE an new item", (done) => {
      const itemId = 1;
      chai.request(server)                
          .delete("/sliderItems/" + itemId)
          .end((err, response) => {
              response.should.have.status(404);
          done();
          });          
  });    
  })
});
