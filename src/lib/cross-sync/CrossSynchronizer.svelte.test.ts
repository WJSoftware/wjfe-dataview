import { describe, test, expect, beforeEach, vi } from 'vitest';
import { CrossSynchronizer, crossVisualSync } from './CrossSynchronizer.svelte';
import type { WjDvColumn } from "$lib/WjDataView/WjDataView.svelte";
import { CrossSync } from './CrossSync.svelte.js';

describe('CrossSynchronizer', () => {
    let synchronizer: CrossSynchronizer;
    let columnA: WjDvColumn;
    let columnB: WjDvColumn;

    beforeEach(() => {
        synchronizer = new CrossSynchronizer();
        columnA = { hidden: false, minWidth: 100, pinned: false, useMinWidthAsWidth: false, width: 200 } as WjDvColumn;
        columnB = { hidden: true, minWidth: 150, pinned: true, useMinWidthAsWidth: true, width: 250 } as WjDvColumn;
    });

    describe('createProperty', () => {
        test("Should create the specified property.", () => {
            // Arrange.
            const propertyName = 'hidden';
            const column = {} as WjDvColumn;

            // Act.
            synchronizer.createProperty(column, propertyName);

            // Assert.
            expect(column).toHaveProperty(propertyName);
        });
        test("Should  copy the property's original value when creating the property.", () => {
            // Arrange.
            const propertyName = 'text';
            const propertyValue = 'abc';
            const column = { [propertyName]: propertyValue } as WjDvColumn;

            // Act.
            synchronizer.createProperty(column, propertyName);

            // Assert.
            expect(column[propertyName]).toBe(propertyValue);
        });
        test.each(crossVisualSync)("Should reset the synchronizer's expectedLeft when '%s' changes.", (propertyName) => {
            // Arrange.
            const newValue = columnB[propertyName];
            synchronizer.createProperty(columnA, propertyName);
            synchronizer.createProperty(columnB, propertyName);
            synchronizer.syncColumns(columnA, columnB);
            columnA.sync!.expectedLeft = 100;

            // Act.
            // @ts-expect-error TS2322
            columnA[propertyName] = newValue;

            // Assert.
            expect(columnA.sync!.expectedLeft).toBe(0);
        });
    });
    describe('syncColumns', () => {
        test("Should add the sync property to both columns.", () => {
            // Arrange.
            const propertyName = 'hidden';
            synchronizer.createProperty(columnA, propertyName);
            synchronizer.createProperty(columnB, propertyName);

            // Act.
            synchronizer.syncColumns(columnA, columnB);

            // Assert.
            expect(columnA).toHaveProperty('sync');
            expect(columnB).toHaveProperty('sync');
        });
        test("The synchronizable properties' value of both columns should always have its value synchronized.", () => {
            // Arrange.
            const propertyName = 'minWidth';
            synchronizer.createProperty(columnA, propertyName);
            synchronizer.createProperty(columnB, propertyName);
            synchronizer.syncColumns(columnA, columnB);

            // Act.
            columnA[propertyName] = 250;

            // Assert.
            expect(columnB[propertyName]).toBe(columnA[propertyName]);
        });
        test("Should use the value of the first column of all synchronizable properties as the value of the second column.", () => {
            // Arrange.
            const propertyNames = ['minWidth', 'pinned', 'useMinWidthAsWidth', 'width'] satisfies (keyof WjDvColumn)[];
            synchronizer.createProperty(columnA, ...propertyNames);
            synchronizer.createProperty(columnB, ...propertyNames);

            // Act.
            synchronizer.syncColumns(columnA, columnB);

            // Assert.
            for (let propertyName of propertyNames) {
                expect(columnB[propertyName]).toBe(columnA[propertyName]);
            }
        });
        test.each([
            {
                preSyncWithFirst: false,
                text1: 'second',
                text2: 'first',
            },
            {
                preSyncWithFirst: true,
                text1: 'first',
                text2: 'second',
            },
        ])("Should reuse the CrossSync instance of the $text1 column to synchronize the $text2 one.", ({ preSyncWithFirst }) => {
            // Arrange.
            const columnC = { hidden: false, minWidth: 100, pinned: false, useMinWidthAsWidth: false, width: 200 } as WjDvColumn;
            synchronizer.createProperty(columnA, 'hidden');
            synchronizer.createProperty(columnB, 'hidden');
            synchronizer.createProperty(columnC, 'hidden');
            synchronizer.syncColumns(preSyncWithFirst ? columnA : columnB, columnC);

            // Act.
            synchronizer.syncColumns(columnA, columnB);

            // Assert.
            expect(columnA.sync).toBe(columnB.sync);
            expect(columnB.sync).toBe(columnC.sync);
        });
        test("Should throw an error if the columns are already synchronized.", () => {
            // Arrange.
            synchronizer.createProperty(columnA, 'hidden');
            synchronizer.createProperty(columnB, 'hidden');
            synchronizer.syncColumns(columnA, columnB);

            // Act.
            const act = () => synchronizer.syncColumns(columnA, columnB);

            // Assert.
            expect(act).toThrow();
        });
    });
});