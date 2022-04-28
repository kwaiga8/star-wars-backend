import { expect } from 'chai';
import 'chai-http';
import * as chai from 'chai';

chai.use(require('chai-http'));

describe('Smoke checks', () => {
  const LOCAL_DEV_URL = 'http://localhost:3000';

  it('should display proper info for root endpoint', (done) => {
    chai
      .request(`${LOCAL_DEV_URL}`)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).contain('Hello Star Wars Universe!');
        done();
      });
  });

  it('should return 200 for main characters endpoint', (done) => {
    chai
      .request(`${LOCAL_DEV_URL}/characters`)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 200 for main episodes endpoint', (done) => {
    chai
      .request(`${LOCAL_DEV_URL}/episodes`)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return proper info of pagination and within correct limit', (done) => {
    chai
      .request(`${LOCAL_DEV_URL}/characters`)
      .get('/')
      .query({ limit: 21 })
      .end((err, res) => {
        expect(res.body.items).to.exist;
        expect(res.body.meta).to.exist;
        expect(res.body.meta.totalItems).to.exist;
        expect(res.body.meta.totalPages).to.exist;
        expect(res.body.meta.itemCount).to.exist;
        expect(res.body.meta.currentPage).to.exist;
        expect(res.body.meta.itemsPerPage).to.exist;
        expect(res.body.meta.itemsPerPage).to.be.equal(20);
        expect(res).to.have.status(200);
        done();
      });
  });
});
