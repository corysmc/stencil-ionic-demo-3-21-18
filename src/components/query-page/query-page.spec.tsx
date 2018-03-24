import { render, flush } from '@stencil/core/testing';
import { QueryPage } from './query-page';

describe('query-page', () => {
  it('should build', () => {
    expect(new QueryPage()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [QueryPage],
        html: '<query-page></query-page>'
      });
    });

    it('should work with both the first and the last name', async () => {
      element.first = 'Peter';
      element.last = 'Parker';
      await flush(element);
      expect(element.textContent).toEqual('Hello, my name is Peter Parker');
    });
  });
});
