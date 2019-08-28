module.exports = {
  name: 'auctions',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/auctions',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
