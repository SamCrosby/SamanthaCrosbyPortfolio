'use strict';

define('web-app/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/connect-four.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/connect-four.js should pass ESLint\n\n165:9 - \'draw\' is assigned a value but never used. (no-unused-vars)\n287:19 - \'createjs\' is not defined. (no-undef)\n295:25 - \'createjs\' is not defined. (no-undef)\n309:25 - \'createjs\' is not defined. (no-undef)\n324:19 - \'createjs\' is not defined. (no-undef)');
  });

  QUnit.test('components/number-game.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/number-game.js should pass ESLint\n\n');
  });

  QUnit.test('components/question-1.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/question-1.js should pass ESLint\n\n7:21 - \'createjs\' is not defined. (no-undef)\n10:21 - \'createjs\' is not defined. (no-undef)\n17:19 - \'createjs\' is not defined. (no-undef)\n18:9 - \'graphics\' is already defined. (no-redeclare)');
  });

  QUnit.test('components/question-2.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/question-2.js should pass ESLint\n\n7:21 - \'createjs\' is not defined. (no-undef)\n10:19 - \'createjs\' is not defined. (no-undef)\n17:20 - \'createjs\' is not defined. (no-undef)');
  });

  QUnit.test('components/question-3.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/question-3.js should pass ESLint\n\n6:21 - \'createjs\' is not defined. (no-undef)\n9:19 - \'createjs\' is not defined. (no-undef)\n16:22 - \'createjs\' is not defined. (no-undef)\n17:9 - \'graphics\' is already defined. (no-redeclare)\n23:24 - \'createjs\' is not defined. (no-undef)\n24:9 - \'graphics\' is already defined. (no-redeclare)');
  });

  QUnit.test('components/question-4.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/question-4.js should pass ESLint\n\n7:21 - \'createjs\' is not defined. (no-undef)\n10:22 - \'createjs\' is not defined. (no-undef)\n20:21 - \'createjs\' is not defined. (no-undef)\n21:9 - \'graphics\' is already defined. (no-redeclare)\n29:25 - \'createjs\' is not defined. (no-undef)\n30:9 - \'graphics\' is already defined. (no-redeclare)');
  });

  QUnit.test('components/question-5.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/question-5.js should pass ESLint\n\n7:21 - \'createjs\' is not defined. (no-undef)\n10:19 - \'createjs\' is not defined. (no-undef)\n17:23 - \'createjs\' is not defined. (no-undef)\n18:9 - \'graphics\' is already defined. (no-redeclare)\n24:23 - \'createjs\' is not defined. (no-undef)\n25:9 - \'graphics\' is already defined. (no-redeclare)\n31:23 - \'createjs\' is not defined. (no-undef)\n32:10 - \'graphics\' is already defined. (no-redeclare)\n41:26 - \'createjs\' is not defined. (no-undef)\n42:10 - \'graphics\' is already defined. (no-redeclare)\n51:28 - \'createjs\' is not defined. (no-undef)\n52:10 - \'graphics\' is already defined. (no-redeclare)\n61:27 - \'createjs\' is not defined. (no-undef)\n62:10 - \'graphics\' is already defined. (no-redeclare)\n71:27 - \'createjs\' is not defined. (no-undef)\n72:10 - \'graphics\' is already defined. (no-redeclare)\n81:10 - \'circlethree\' is already defined. (no-redeclare)\n81:28 - \'createjs\' is not defined. (no-undef)\n82:10 - \'graphics\' is already defined. (no-redeclare)\n91:20 - \'createjs\' is not defined. (no-undef)\n92:10 - \'graphics\' is already defined. (no-redeclare)\n98:21 - \'createjs\' is not defined. (no-undef)\n99:10 - \'graphics\' is already defined. (no-redeclare)\n108:24 - \'createjs\' is not defined. (no-undef)\n109:10 - \'graphics\' is already defined. (no-redeclare)\n118:26 - \'createjs\' is not defined. (no-undef)\n119:10 - \'graphics\' is already defined. (no-redeclare)\n128:25 - \'createjs\' is not defined. (no-undef)\n129:10 - \'graphics\' is already defined. (no-redeclare)');
  });

  QUnit.test('components/tic-tac-toe.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/tic-tac-toe.js should pass ESLint\n\n39:9 - \'draw\' is assigned a value but never used. (no-unused-vars)\n134:5 - \'tests\' is assigned a value but never used. (no-unused-vars)\n143:11 - \'cutoff\' is already defined. (no-redeclare)\n230:5 - \'createjs\' is not defined. (no-undef)\n231:5 - \'createjs\' is not defined. (no-undef)\n235:21 - \'createjs\' is not defined. (no-undef)\n238:21 - \'createjs\' is not defined. (no-undef)\n257:30 - \'createjs\' is not defined. (no-undef)\n266:29 - \'createjs\' is not defined. (no-undef)\n283:5 - \'createjs\' is not defined. (no-undef)\n294:11 - \'createjs\' is not defined. (no-undef)\n341:13 - \'createjs\' is not defined. (no-undef)\n342:13 - \'createjs\' is not defined. (no-undef)\n344:9 - \'createjs\' is not defined. (no-undef)\n345:9 - \'createjs\' is not defined. (no-undef)\n347:9 - \'createjs\' is not defined. (no-undef)\n359:11 - \'markers\' is already defined. (no-redeclare)');
  });

  QUnit.test('controllers/game.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/game.js should pass ESLint\n\n');
  });

  QUnit.test('models/highscore.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/highscore.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/game.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/game.js should pass ESLint\n\n');
  });

  QUnit.test('routes/highscores.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/highscores.js should pass ESLint\n\n');
  });
});
define('web-app/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  var run = Ember.run;
  function destroyApp(application) {
    run(application, 'destroy');
  }
});
define('web-app/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'web-app/tests/helpers/start-app', 'web-app/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('web-app/tests/helpers/resolver', ['exports', 'web-app/resolver', 'web-app/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('web-app/tests/helpers/start-app', ['exports', 'web-app/app', 'web-app/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  var merge = Ember.merge;
  var run = Ember.run;
  function startApp(attrs) {
    var attributes = merge({}, _environment.default.APP);
    attributes = merge(attributes, attrs); // use defaults, but you can override;

    return run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('web-app/tests/integration/components/connect-four-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('connect-four', 'Integration | Component | connect four', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ASId/eFv",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"connect-four\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "2Lr2RVo9",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"connect-four\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web-app/tests/test-helper', ['web-app/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('web-app/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/connect-four-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/connect-four-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('web-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
