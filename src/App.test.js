import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './SearchPlace';

test('renders learn react link', () => {
  render(
    <React.StrictMode>
      <App />
      <Home />
    </React.StrictMode>
    );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
