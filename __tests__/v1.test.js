'use strict';
const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose'); 
const request = supergoose(server);
let id;

describe('Clothes Api Server', () => {
    it('should be able to create a clothes on POST /clothes', async () => {
        const response = await request.post('/api/v1/clothes').send({
          name: 'jeans',
          color: 'white',
          size: 'xxl'
        });
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('jeans');
        expect(response.body.color).toEqual('white');
        expect(response.body.size).toEqual('xxl');

        id = response.body._id;
      });
      it('should be able to update a clothes on PUT /clothes', async () => {
        const response = await request.put(`/api/v1/clothes/${id}`).send({
            name: 't-shirt',
            color: 'yellow',
            size: 'large'
        });

         expect(response.status).toEqual(200);
         expect(response.body.name).toEqual('t-shirt');
         expect(response.body.color).toEqual('yellow');
      });

      xit('should be able to update a clothes on patch /clothes', async () => {
        const response = await request.patch(`/api/v1/clothes/${id}`).send({
            name: 't-shirt',
            color: 'yellow',
            size: 'large'
        });

         expect(response.status).toEqual(200);
         expect(response.body.name).toEqual('t-shirt');
         expect(response.body.color).toEqual('yellow');
      });
      
      it('should be able to get a clothes on Get /clothes/:id', async () => {
        const response = await request.get(`/api/v1/clothes/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('t-shirt');
        expect(response.body.color).toEqual('yellow');
      });
      it('should be able to delete specific clothes on DELETE /clothes/:id', async () => {
		const response = await request.delete(`/api/v1/clothes/${id}`);
		expect(response.status).toEqual(200);
	 });
     it('should get all Clothes on GET /clothes', async () => {
		const response = await request.get('/api/v1/clothes');
		expect(response.status).toEqual(200);
	});
  });