import React from 'react';
import { Platform } from 'react-native';
import { act, render } from '@testing-library/react-native';
import { POI } from '../../types/poi';
import POIMarker from '../POIMarker';

jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    Marker: ({
      children,
      tracksViewChanges,
    }: {
      children: React.ReactNode;
      tracksViewChanges: boolean;
    }) => React.createElement(
      View,
      {
        testID: 'map-marker',
        tracksViewChanges,
      },
      children
    ),
  };
});

const museum: POI = {
  id: 'museum',
  name: 'Museum',
  category: 'museum',
  latitude: 48.8566,
  longitude: 2.3522,
  tags: {},
};

const originalPlatform = Platform.OS;

function setPlatform(os: 'android' | 'ios') {
  Object.defineProperty(Platform, 'OS', {
    configurable: true,
    value: os,
  });
}

describe('POIMarker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    setPlatform(originalPlatform as 'android' | 'ios');
  });

  it('tracks the initial Android render before freezing the marker bitmap', () => {
    setPlatform('android');

    const { getByTestId } = render(
      <POIMarker poi={museum} onPress={jest.fn()} />
    );

    expect(getByTestId('map-marker').props.tracksViewChanges).toBe(true);

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(getByTestId('map-marker').props.tracksViewChanges).toBe(false);
  });

  it('temporarily tracks an Android marker when its selection changes', () => {
    setPlatform('android');

    const { getByTestId, rerender } = render(
      <POIMarker poi={museum} onPress={jest.fn()} isSelected={false} />
    );

    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender(
      <POIMarker poi={museum} onPress={jest.fn()} isSelected />
    );

    expect(getByTestId('map-marker').props.tracksViewChanges).toBe(true);

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(getByTestId('map-marker').props.tracksViewChanges).toBe(false);
  });

  it('keeps view tracking disabled on iOS', () => {
    setPlatform('ios');

    const { getByTestId } = render(
      <POIMarker poi={museum} onPress={jest.fn()} />
    );

    expect(getByTestId('map-marker').props.tracksViewChanges).toBe(false);
  });
});
