# useWithLoading
useWithLoading is a custom React hook that adds a loading state to an asynchronous function. It simplifies handling loading state in your components when dealing with async operations.

## Installation

```bash
npm install use-with-loading
```

## Usage

Here's an example of how to use the useWithLoading hook.

```tsx
import React from 'react';
import { useWithLoading } from 'use-with-loading';

const fetchData = async () => {
  return fetch('...')
};

const App = () => {
  const wrappedFunction = useWithLoading(fetchData);

  const handleClick = async () => {
    try {
      const data = await wrappedFunction();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={wrappedFunction.isLoading}>
        Fetch Data
      </button>
      {wrappedFunction.isLoading && <p>Loading...</p>}
    </div>
  );
};

export default App;
```

## API

### useWithLoading(asyncFunction)

- asyncFunction: An asynchronous function that you want to add a loading state to.

#### Returns an object containing:

- wrappedFunction: A function with the same signature as the input asyncFunction. You can call this function in place of the original function.
- wrappedFunction.isLoading: A boolean representing the loading state of the function. It is true when the function is being executed, and false when it is not.

## License

MIT
