import React from 'react';
import './style/navbar.css';

export default () => {
  return (
    <footer className="footer">
      Copyright &copy; {new Date().getFullYear()} Interline Reader
    </footer>
  );
};
