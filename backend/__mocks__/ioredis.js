const Redis = jest.genMockFromModule("ioredis");

Redis.prototype.get.mockImplementation(() => null);
Redis.prototype.setex.mockImplementation(() => null);

module.exports = Redis;
