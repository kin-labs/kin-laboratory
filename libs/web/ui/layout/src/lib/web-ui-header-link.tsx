import { chakra } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const WebUiLayoutHeaderLink = chakra(NavLink, {
  baseStyle: { p: 4, rounded: 'md' },
});
