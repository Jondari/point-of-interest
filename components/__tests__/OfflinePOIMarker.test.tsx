import React from 'react';
import { Platform } from 'react-native';
import { act, render } from '@testing-library/react-native';
import { getOfflinePOIs } from '../../services/offlinePoiService';
import { groupOfflinePOIsByCoordinates } from '../../utils/offlinePoiMap';
import OfflinePOIMarker from '../OfflinePOIMarker';

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
      { testID: 'offline-map-marker', tracksViewChanges },
      children
    ),
  };
});

const group = groupOfflinePOIsByCoordinates([getOfflinePOIs('paris')[0]])[0];
const originalPlatform = Platform.OS;

function setPlatform(os: 'android' | 'ios') {
  Object.defineProperty(Platform, 'OS', {
    configurable: true,
    value: os,
  });
}

describe('OfflinePOIMarker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    setPlatform(originalPlatform as 'android' | 'ios');
  });

  it('freezes the Android marker bitmap after its initial render', () => {
    setPlatform('android');
    const { getByTestId } = render(
      <OfflinePOIMarker group={group} onPress={jest.fn()} />
    );

    expect(getByTestId('offline-map-marker').props.tracksViewChanges).toBe(true);

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(getByTestId('offline-map-marker').props.tracksViewChanges).toBe(false);
  });

  it('keeps marker view tracking disabled on iOS', () => {
    setPlatform('ios');
    const { getByTestId } = render(
      <OfflinePOIMarker group={group} onPress={jest.fn()} />
    );

    expect(getByTestId('offline-map-marker').props.tracksViewChanges).toBe(false);
  });
});
