var vows = require('vows'),
    events = require('events'),
    assert = require('assert'),
    transform = require('./transform');

vows.describe('Fest tests').addBatch({
    'include':{
        topic:function(){
            var promise = new(events.EventEmitter);
            transform('/templates/include.xml', {list:[1, 2]}, {}, promise);
            return promise;
        },
        'result':function(result){
            assert.equal(result, '12');
        }
    },
    'include with syntax errors in context attribute':{
        topic:function(){
            var promise = new(events.EventEmitter);
            transform('/templates/include_with_errors_in_context.xml', {}, {}, promise, true, {nothrow: true});
            return promise;
        },
        'result':function(result){
            assert.include(result, 'At line 3: attribute "context" has SyntaxError: Unexpected token ILLEGAL');
        }
    }
}).run();

