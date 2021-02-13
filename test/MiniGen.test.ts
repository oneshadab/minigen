
import { MiniGen } from 'src/MiniGen';
import { compare } from 'dir-compare';

describe('MiniGen', () => {
  describe('build', () => {
    it('should build the site properly', async () => {
      const src = 'test/data/sample-site';
      const expectedOut = 'test/data/sample-site/out';

      // Todo: replace with tmp-dir
      const dst = 'test/tmp';

      await MiniGen.build(src, dst);
      const compareResult = await compare(dst, expectedOut);
      expect(compareResult.same)
        .toBeTruthy();
    });
  });
});
