# getDeepObj
replace object params by keys

# example:

## data:
```
      const data = {
        'obj0': {
          'child0': 0,
          'child1': 1,
          'child2': 2
        },
        'obj1': {
          'child0': 0,
          'child1': 1,
          'child2': 2
        },
        'obj2': {
          'sample': 'A0'
        },
        'obj3': {
          'sample': 'A0'
        },
        'obj4': {
          'sample': 'A0'
        }
      };
```
## sources by keys: 
```
      const keys = {
        'obj*.*': {
          0: 'test0',
          1: 'test1',
          2: 'test2'
        },
        'obj1.*': {
          0: 'TEST0',
          1: 'TEST1',
          2: 'TEST2'
        },
        'obj*.sample': {
          'A0': {
            'some': 'another',
            'injected': 'object'
          }
        },
        'obj3.sample': {
          'A0':{
            'some': 'Another'
          }
        },
        'obj4.*': { sample: {} }
      }
```
## result:
```
      console.log( this.getDeepObj(data, keys, 'obj0') );            // Object { child0: "test0", child1: "test1", child2: "test2" }
      console.log( this.getDeepObj(data, keys, 'obj0.child1') );     // test1
      console.log( this.getDeepObj(data, keys, 'obj1.child1') );     // TEST1
      console.log( this.getDeepObj(data, keys, 'obj2') );            // Object { sample: { some: "another", injected: "object" } }
      console.log( this.getDeepObj(data, keys, 'obj3') );            // Object { sample: { some: "Another" } }
      console.log( this.getDeepObj(data, keys, 'obj4') );            // Object { sample: undefined }
```
