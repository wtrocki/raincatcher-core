import RaincatcherBase from '../src';
import baseSuite from './index';

/**
 * Auxiliary class so we can have a parameter-less constructor
 * Could have stubs/spies, etc.
 */
class NoopRaincatcherBase extends RaincatcherBase {
  constructor() {
    super({
      log: () => undefined
    });
  }
}

describe('RaincatcherBase', function() {
  // Use regular variables instead of mocha's `this` so it's strongly typed
  let subject: RaincatcherBase;
  beforeEach(function() {
    subject = new RaincatcherBase(console, { prefix: 'foo' });
  });
  describe('#customFunction', function() {
    it('should add the supplied prefix', function() {
      return /foo/.test(subject.customFunction());
    });
  });

  // Delegate to public interface suite
  baseSuite(NoopRaincatcherBase);
});
