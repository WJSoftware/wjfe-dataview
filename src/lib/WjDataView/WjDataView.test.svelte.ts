import { render } from '@testing-library/svelte';
import { createRawSnippet, flushSync } from 'svelte';
import { describe, expect, test, vi } from 'vitest';
import WjDataView, { defineData, GridLines, type ColAlignment, type ControlColumn, type DataCellContext, type GridLinesEnum, type PropSpreadingTarget, type WjDvColumn, type WjDvRow } from './WjDataView.svelte';

describe('WjDataView', () => {
    describe('Initial Render', () => {
        test("Should render the data row object's property value when no 'get' function is provided.", () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'a',
                    text: 'A',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([
                {
                    id: 1,
                    a: 'A-content',
                }
            ]));

            // Act.
            const { getByRole } = render(WjDataView, { columns, data });

            // Assert.
            const dataCell = getByRole('cell');
            expect(dataCell.textContent?.trim()).toEqual(data[0].a);
        });
        test("Should render the data cell content using the function provided via the 'get' property.", () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'a',
                    text: 'A',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([
                {
                    id: 1,
                    a: 'A-content',
                }
            ]));
            const getFn = vi.fn<(row: Record<string, any>, key: string) => any>();
            const content = 'Improved!';
            getFn.mockReturnValue(content);

            // Act.
            const { getByRole } = render(WjDataView, { columns, data, get: getFn });

            // Assert.
            expect(getFn).toHaveBeenCalledOnce();
            expect(getFn).toHaveBeenCalledWith(data[0], 'a');
            const dataCell = getByRole('cell');
            expect(dataCell.textContent?.trim()).toEqual(content);
        });
        test("Should render the table with row tracking by default.", () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getByRole } = render(WjDataView, { columns, data });

            // Assert.
            const body = getByRole('rowgroup');
            expect(body.classList.contains('row-tracking')).toEqual(true);
        });
        test.each([
            {
                rowTracking: false,
                text: 'without',
            },
            {
                rowTracking: true,
                text: 'with',
            },
        ])("Should render the table $text row tracking whenever the 'rowTracking' property is $rowTracking .", ({ rowTracking }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getByRole } = render(WjDataView, { columns, data, rowTracking });

            // Assert.
            const body = getByRole('rowgroup');
            expect(body.classList.contains('row-tracking')).toEqual(rowTracking);
        });
        test("Should render the table with row selection highlighting turned on by default.", () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));
            data[0].wjdv.selected = true;

            // Act.
            const { getByRole } = render(WjDataView, { columns, data });

            // Assert.
            const rowElem = getByRole('row', { selected: true });
            expect(rowElem.classList.contains('selected')).toEqual(true);
        });
        test.each([
            {
                highlight: false,
                text: 'off',
            },
            {
                highlight: true,
                text: 'on',
            },
        ])("Should render the table with row selection highlighting turned $text whenever the 'rowSelectionHighlight' property is $highlight .", ({ highlight }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));
            data[0].wjdv.selected = true;

            // Act.
            const { getByRole } = render(WjDataView, { columns, data, rowSelectionHighlight: highlight });

            // Assert.
            const rowElem = getByRole('row', { selected: true });
            expect(rowElem.classList.contains('selected')).toEqual(highlight);
        });
        test("Should render the table with row striping on by default.", () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getByRole } = render(WjDataView, { columns, data });

            // Assert.
            const body = getByRole('rowgroup');
            expect(body.classList.contains('striped')).toEqual(true);
        });
        test.each([
            {
                striped: false,
                text: 'off',
            },
            {
                striped: true,
                text: 'on',
            },
        ])("Should render the table with row striping $text whenever the 'striped' property is $striped .", ({ striped }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getByRole } = render(WjDataView, { columns, data, striped });

            // Assert.
            const body = getByRole('rowgroup');
            expect(body.classList.contains('striped')).toEqual(striped);
        });
        test("Should render the table with no gridlines by default.", () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getByRole, getAllByRole } = render(WjDataView, { columns, data });

            // Assert.
            const rows = getAllByRole('row');
            rows.forEach(r => expect(r.classList.contains('row-grid-line')).toEqual(false));
            let cell = getAllByRole('columnheader')[0];
            expect(cell.classList.contains('col-grid-line')).toEqual(false);
            cell = getByRole('cell');
            expect(cell.classList.contains('col-grid-line')).toEqual(false);
        });
        test.each([
            {
                gridLines: GridLines.None,
                text: 'no grid lines',
                rowExpectation: false,
                colExpectation: false,
            },
            {
                gridLines: GridLines.Column,
                text: 'column grid lines',
                rowExpectation: false,
                colExpectation: true,
            },
            {
                gridLines: GridLines.Row,
                text: 'row grid lines',
                rowExpectation: true,
                colExpectation: false,
            },
            {
                gridLines: GridLines.All,
                text: 'grid lines',
                rowExpectation: true,
                colExpectation: true,
            },
        ])("Should render the table with $text whenever the 'gridlines' property is $gridlines .", ({ gridLines, rowExpectation, colExpectation }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getByRole, getAllByRole } = render(WjDataView, { columns, data, gridLines });

            // Assert.
            const rows = getAllByRole('row');
            rows.forEach(r => expect(r.classList.contains('row-grid-line')).toEqual(rowExpectation));
            let cell = getAllByRole('columnheader')[0];
            expect(cell.classList.contains('col-grid-line')).toEqual(colExpectation);
            cell = getByRole('cell');
            expect(cell.classList.contains('col-grid-line')).toEqual(colExpectation);
        });
        test("Should render the table with the pinned divider by default.", () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                    pinned: true,
                },
                {
                    key: 'colB',
                    text: 'Col B',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getAllByRole } = render(WjDataView, { columns, data });

            // Assert.
            let cell = getAllByRole('columnheader');
            expect(cell[0].classList.contains('sticky-divider')).toEqual(true);
            cell = getAllByRole('cell');
            expect(cell[0].classList.contains('sticky-divider')).toEqual(true);
        });
        test.each([
            {
                pinnedDivider: false,
                text: 'without',
            },
            {
                pinnedDivider: true,
                text: 'with',
            },
        ])("Should render the table $text the pinned divider whenever the 'pinnedDivider' property is $pinnedDivider .", ({ pinnedDivider }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                    pinned: true,
                },
                {
                    key: 'colB',
                    text: 'Col B',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getAllByRole } = render(WjDataView, { columns, data, pinnedDivider });

            // Assert.
            let cell = getAllByRole('columnheader');
            expect(cell[0].classList.contains('sticky-divider')).toEqual(pinnedDivider);
            cell = getAllByRole('cell');
            expect(cell[0].classList.contains('sticky-divider')).toEqual(pinnedDivider);
        });
        test.each([
            {
                text: 'with',
                noViewport: false,
            },
            {
                text: 'without',
                noViewport: true,
            },
        ])('Should render $text viewport when the noViewport property is $noViewport .', ({ noViewport }) => {
            // Arrange.
            const columns = $state([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getByRole } = render(WjDataView, { columns, data, noViewport });

            // Assert.
            const tableParent = getByRole('table').parentElement;
            expect(tableParent?.classList.contains('dataview-container')).toEqual(!noViewport);
        });
        test.each([
            {
                noViewport: false,
                text: 'viewport',
            },
            {
                noViewport: true,
                text: 'table',
            },
        ])("Should add the classes specified via the 'class' property to the $text element whenever the 'noViewport' property is $noViewport .", ({ noViewport }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                }
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const cssClass = 'the-class';

            // Act.
            const { getByRole } = render(WjDataView, { columns, data, noViewport, class: cssClass });

            // Assert.
            let elem = getByRole('table');
            if (!noViewport) {
                elem = elem.parentElement!;
            };
            expect(elem.classList.contains(cssClass)).toEqual(true);
        });
        test.each([
            {
                noViewport: false,
                text: 'viewport',
            },
            {
                noViewport: true,
                text: 'table',
            },
        ])("Should pass any unknown properties as attributes to the $text element by default when 'noViewport' is $noViewport .", ({ noViewport }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const customAtt = 'data-test';
            const customAttValue = 'abc';

            // Act.
            const { getByRole } = render(WjDataView, { columns, data, noViewport, [customAtt]: customAttValue });

            // Assert.
            const table = getByRole('table');
            if (noViewport) {
                expect(table.getAttribute(customAtt)).toEqual(customAttValue);
                expect(table.parentElement?.getAttribute(customAtt)).toBeFalsy();
            }
            else {
                expect(table.getAttribute(customAtt)).toBeFalsy();
                expect(table.parentElement?.getAttribute(customAtt)).toEqual(customAttValue);
            }
        });
        test.each<{
            noViewport: boolean;
            propSpreadingTarget: PropSpreadingTarget;
            target: 'viewport' | 'table' | 'none';
        }>([
            {
                noViewport: false,
                propSpreadingTarget: 'root',
                target: 'viewport',
            },
            {
                noViewport: true,
                propSpreadingTarget: 'root',
                target: 'table',
            },
            {
                noViewport: false,
                propSpreadingTarget: 'table',
                target: 'table',
            },
            {
                noViewport: true,
                propSpreadingTarget: 'table',
                target: 'table',
            },
            {
                noViewport: false,
                propSpreadingTarget: 'viewport',
                target: 'viewport',
            },
            {
                noViewport: true,
                propSpreadingTarget: 'viewport',
                target: 'none',
            },
        ])("Should spread unknown props on the $target element for 'noViewport' = $noViewport and 'propSpreadingTarget' = $propSpreadingTarget .", (args) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const customAtt = 'data-test';
            const customAttValue = 'abc';

            // Act.
            const { getByRole } = render(WjDataView, {
                columns,
                data,
                noViewport: args.noViewport,
                propSpreadingTarget: args.propSpreadingTarget,
                [customAtt]: customAttValue,
            });

            // Assert.
            const table = getByRole('table');
            const viewport = table.parentElement!;
            if (args.target === 'none') {
                expect(table.getAttribute(customAtt)).toBeFalsy();
                expect(viewport.getAttribute(customAtt)).toBeFalsy();
            }
            else if (args.target === 'table') {
                expect(table.getAttribute(customAtt)).toEqual(customAttValue);
                expect(viewport.getAttribute(customAtt)).toBeFalsy();
            }
            else {
                expect(table.getAttribute(customAtt)).toBeFalsy();
                expect(viewport.getAttribute(customAtt)).toEqual(customAttValue);
            }
        });
        test("Should set the class provided via the 'headerClass' property on every header cell.", () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
                {
                    key: 'name',
                    text: 'Name',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));

            // Act.
            const { getAllByRole } = render(WjDataView, {
                columns,
                data,
                controlColumn: {
                    text: 'x',
                    resizable: false,
                }
            });

            // Assert.
            const headerCells = getAllByRole('columnheader');
            expect(headerCells.length).toEqual(columns.length + 2);
        });
        describe('Control Column', () => {
            test.each<{ text1: string; text2: string; controlColumn?: ControlColumn; }>([
                {
                    text1: 'render',
                    text2: 'specified',
                    controlColumn: {
                        resizable: false,
                    },
                },
                {
                    text1: 'not render',
                    text2: 'unspecified',
                    controlColumn: undefined,
                },
            ])("Should $text1 the control column whenever the control column is $text2 .", ({ controlColumn }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Assert.
                let cells = getAllByRole('columnheader');
                expect(cells.length).toEqual(columns.length + 1 + (controlColumn ? 1 : 0));
                cells = getAllByRole('cell');
                expect(cells.length).toEqual(columns.length + (controlColumn ? 1 : 0));
            });
            test("Should render the control column with the default width when 'width' is not specified.", () => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                        width: 2,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn: ControlColumn = {
                    resizable: false,
                };
                const defaultWidth = 5;

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn, defaultWidth });

                // Assert.
                let cells = getAllByRole('columnheader');
                expect(cells[0].style.width).toEqual(`${defaultWidth}em`);
                cells = getAllByRole('cell');
                expect(cells[0].style.width).toEqual(`${defaultWidth}em`);
            });
            test("Should render the control column with the specified width.", () => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                        width: 2,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn: ControlColumn = {
                    resizable: false,
                    width: 3,
                };
                const defaultWidth = 5;

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn, defaultWidth });

                // Assert.
                let cells = getAllByRole('columnheader');
                expect(cells[0].style.width).toEqual(`${controlColumn.width}em`);
                cells = getAllByRole('cell');
                expect(cells[0].style.width).toEqual(`${controlColumn.width}em`);
            });
            test.each([
                {
                    useMinWidthAsWidth: false,
                    text: 'Should not',
                },
                {
                    useMinWidthAsWidth: true,
                    text: 'Should',
                },
            ])("$text use the specified 'minWidth' value as width whenever 'useMinWidthAsWidth' is $useMinWidthAsWidth .", ({ useMinWidthAsWidth }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                        width: 2,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn: ControlColumn = {
                    resizable: false,
                    minWidth: 7,
                    useMinWidthAsWidth
                };
                const defaultWidth = 5;

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn, defaultWidth });

                // Assert.
                let cells = getAllByRole('columnheader');
                expect(cells[0].style.width).toEqual(`${useMinWidthAsWidth ? controlColumn.minWidth : defaultWidth}em`);
                cells = getAllByRole('cell');
                expect(cells[0].style.width).toEqual(`${useMinWidthAsWidth ? controlColumn.minWidth : defaultWidth}em`);
            });
            test("Should not render the value of the 'text' property when rendering the default header contents.", () => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn: ControlColumn = {
                    resizable: false,
                    text: 'ABC'
                };

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Assert.
                const cells = getAllByRole('columnheader');
                expect(cells[0].textContent?.trim()).toEqual('');
            });
            test.each([
                {
                    hidden: false,
                    text: 'Should not'
                },
                {
                    hidden: true,
                    text: 'Should'
                },
            ])("$text render the control column whenever the 'hidden' property is $hidden .", ({ hidden }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn: ControlColumn = {
                    resizable: false,
                    hidden,
                };

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Assert.
                const headerCells = getAllByRole('columnheader');
                expect(headerCells.length).toEqual(hidden ? 2 : 3);
            });
            test.each<{ alignment: ColAlignment; expectedClass: string; }>([
                {
                    alignment: 'center',
                    expectedClass: 'align-center',
                },
                {
                    alignment: 'end',
                    expectedClass: 'align-end',
                },
                {
                    alignment: 'start',
                    expectedClass: 'align-start',
                },
            ])("Should align the contents of the control column to the $alignment via the 'alignment' property.", ({ alignment, expectedClass }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn: ControlColumn = {
                    resizable: false,
                    alignment,
                };

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Assert.
                const dataCell = getAllByRole('cell')[0].querySelector('div.dataview-cell-d');
                expect(dataCell?.classList.contains(expectedClass)).toEqual(true);
            });
            test.each([
                {
                    noTextWrap: false,
                    text: 'allow',
                },
                {
                    noTextWrap: true,
                    text: 'disallow',
                },
            ])("Should $text text wrapping in the control column's data cells whenever 'noTextWrap' is $noTextWrap .", ({ noTextWrap }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn: ControlColumn = {
                    resizable: false,
                    noTextWrap
                };

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Assert.
                const dataCell = getAllByRole('cell')[0].querySelector('div.dataview-cell-d');
                expect(dataCell?.classList.contains('no-wrap')).toEqual(noTextWrap);
            });
        });
    });
    describe('Reactivity', () => {
        test("Should re-render the contents of cells whenever the 'get' property changes.", async () => {
            // Arrange.
            const fn1 = vi.fn();
            const fn2 = vi.fn();
            const rv1 = 'A';
            const rv2 = 'B';
            fn1.mockReturnValue(rv1);
            fn2.mockReturnValue(rv2);
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const { getByRole, rerender } = render(WjDataView, { columns, data, get: fn1 });
            const dataCell = getByRole('cell');
            expect(fn1).toHaveBeenCalledOnce();
            expect(dataCell.textContent?.trim()).toEqual(rv1);

            // Act.
            await rerender({ columns, data, get: fn2 });
            flushSync();

            // Assert.
            expect(fn2).toHaveBeenCalledOnce();
            expect(dataCell.textContent?.trim()).toEqual(rv2);
        });
        test.each([
            {
                rowTracking: false,
                text: 'off',
            },
            {
                rowTracking: true,
                text: 'on',
            },
        ])("Should turn row tracking $text whenever the 'rowTracking' property changes to $rowTracking .", async ({ rowTracking }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const { getAllByRole, rerender } = render(WjDataView, { columns, data, rowTracking: !rowTracking });

            // Act.
            await rerender({ columns, data, rowTracking });
            flushSync();

            // Assert.
            const body = getAllByRole('rowgroup')[0];
            expect(body.classList.contains('row-tracking')).toEqual(rowTracking);
        });
        test.each([
            {
                rowSelectionHighlight: false,
                text: 'off',
            },
            {
                rowSelectionHighlight: true,
                text: 'on',
            },
        ])("Should turn row selection highlight $text whenever the 'rowTracking' property changes to $rowTracking .", async ({ rowSelectionHighlight }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            data[0].wjdv.selected = true;
            const { getAllByRole, rerender } = render(WjDataView, { columns, data, rowSelectionHighlight: !rowSelectionHighlight });

            // Act.
            await rerender({ columns, data, rowSelectionHighlight });
            flushSync();

            // Assert.
            const dataRow = getAllByRole('row')[1];
            expect(dataRow.classList.contains('selected')).toEqual(rowSelectionHighlight);
        });
        test.each([
            {
                striped: false,
                text: 'off',
            },
            {
                striped: true,
                text: 'on',
            },
        ])("Should turn row striping $text whenever the 'striped' property changes to $rowTracking .", async ({ striped }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const { getAllByRole, rerender } = render(WjDataView, { columns, data, striped: !striped });

            // Act.
            await rerender({ columns, data, striped });
            flushSync();

            // Assert.
            const dataRow = getAllByRole('rowgroup')[0];
            expect(dataRow.classList.contains('striped')).toEqual(striped);
        });
        test.each<{
            feature: string;
            state: string;
            gridLines: GridLinesEnum;
            initialGridLines: GridLinesEnum;
            expectedClasses: Record<string, {
                present: boolean;
                targets: string[];
            }>;
        }>([
            {
                feature: 'row grid lines',
                state: 'on',
                gridLines: GridLines.Row,
                initialGridLines: GridLines.None,
                expectedClasses: {
                    'col-grid-line': {
                        present: false,
                        targets: ['cell', 'columnheader'],
                    },
                    'row-grid-line': {
                        present: true,
                        targets: ['row'],
                    },
                },
            },
            {
                feature: 'row grid lines',
                state: 'off',
                gridLines: GridLines.None,
                initialGridLines: GridLines.Row,
                expectedClasses: {
                    'col-grid-line': {
                        present: false,
                        targets: ['cell', 'columnheader'],
                    },
                    'row-grid-line': {
                        present: false,
                        targets: ['row'],
                    },
                },
            },
            {
                feature: 'column grid lines',
                state: 'off',
                gridLines: GridLines.None,
                initialGridLines: GridLines.Column,
                expectedClasses: {
                    'col-grid-line': {
                        present: false,
                        targets: ['cell', 'columnheader'],
                    },
                    'row-grid-line': {
                        present: false,
                        targets: ['row'],
                    },
                },
            },
            {
                feature: 'column grid lines',
                state: 'on',
                gridLines: GridLines.Column,
                initialGridLines: GridLines.None,
                expectedClasses: {
                    'col-grid-line': {
                        present: true,
                        targets: ['cell', 'columnheader'],
                    },
                    'row-grid-line': {
                        present: false,
                        targets: ['row'],
                    },
                },
            },
            {
                feature: 'column and row grid lines',
                state: 'on',
                gridLines: GridLines.All,
                initialGridLines: GridLines.None,
                expectedClasses: {
                    'col-grid-line': {
                        present: true,
                        targets: ['cell', 'columnheader'],
                    },
                    'row-grid-line': {
                        present: true,
                        targets: ['row'],
                    },
                },
            },
            {
                feature: 'column and row grid lines',
                state: 'off',
                gridLines: GridLines.None,
                initialGridLines: GridLines.All,
                expectedClasses: {
                    'col-grid-line': {
                        present: false,
                        targets: ['cell', 'columnheader'],
                    },
                    'row-grid-line': {
                        present: false,
                        targets: ['row'],
                    },
                },
            },
        ])("Should turn $feature $state whenever the 'gridLines' property changes to $gridGlines .", async ({ initialGridLines, gridLines, expectedClasses }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const { getAllByRole, rerender } = render(WjDataView, { columns, data, gridLines: initialGridLines });

            // Act.
            await rerender({ columns, data, gridLines });
            flushSync();

            // Assert.
            for (let cls of Object.keys(expectedClasses)) {
                for (let role of expectedClasses[cls].targets) {
                    const elems = getAllByRole(role);
                    for (let i = 0; i < elems.length; ++i) {
                        const elem = elems[i];
                        if (role === 'columnheader' && i + 1 === elems.length) {
                            continue;
                        }
                        expect(elem.classList.contains(cls)).toEqual(expectedClasses[cls].present);
                    }
                }
            }
        });
        test.each([
            {
                text: 'off',
                pinnedDivider: false,
            },
            {
                text: 'on',
                pinnedDivider: true,
            },
        ])("Should turn the pinned divider $text whenever the 'pinnedDivider' property changes to $pinnedDivider .", async ({ pinnedDivider }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const { getByRole, getAllByRole, rerender } = render(WjDataView, { columns, data, pinnedDivider: !pinnedDivider });

            // Act.
            await rerender({ columns, data, pinnedDivider });
            flushSync();

            // Assert.
            let cell = getByRole('cell');
            expect(cell.classList.contains('sticky-divider')).toEqual(pinnedDivider);
            cell = getAllByRole('columnheader')[0];
            expect(cell.classList.contains('sticky-divider')).toEqual(pinnedDivider);
        });
        test.each([
            {
                text: 'add',
                noViewport: false,
            },
            {
                text: 'remove',
                noViewport: true,
            },
        ])("Should $text the viewport element whenever the 'noViewport' property changes to $noViewport .", async ({ noViewport }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const { getByRole, rerender } = render(WjDataView, { columns, data, noViewport: !noViewport });

            // Act.
            await rerender({ columns, data, noViewport });
            flushSync();

            // Assert.
            const table = getByRole('table');
            expect(table.parentElement?.classList.contains('dataview-container')).toEqual(!noViewport);
        });
        test.each([
            {
                noViewport: false,
                text: 'viewport',
            },
            {
                noViewport: true,
                text: 'table',
            },
        ])("Should update the list of classes applied to the $text whenever the 'class' property is updated and 'noViewport' is $noViewport .", async ({ noViewport }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const newClasses = 'ABC';
            const data = $state(defineData([{ id: 1 }]));
            const { getByRole, rerender } = render(WjDataView, { columns, data, noViewport, class: "orig" });

            // Act.
            await rerender({ columns, data, noViewport, class: newClasses });
            flushSync();

            // Assert.
            let targetEl = getByRole('table');
            if (!noViewport) {
                targetEl = targetEl.parentElement!;
            };
            expect(targetEl.classList.contains(newClasses)).toEqual(true);
        });
        test.each([
            {
                noViewport: false,
                text: 'viewport',
            },
            {
                noViewport: true,
                text: 'table',
            },
        ])("Should move the value of the 'class' property to the $text whenever 'noViewport' changes to $noViewport.", async ({ noViewport }) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const cssClasses = 'ABC';
            const data = $state(defineData([{ id: 1 }]));
            const { getByRole, rerender } = render(WjDataView, { columns, data, noViewport: !noViewport, class: cssClasses });

            // Act.
            await rerender({ columns, data, noViewport, class: cssClasses });
            flushSync();

            // Assert.
            let targetEl = getByRole('table');
            if (!noViewport) {
                targetEl = targetEl.parentElement!;
            };
            expect(targetEl.classList.contains(cssClasses)).toEqual(true);
        });
        test.each<{
            noViewport: boolean;
            propSpreadingTarget: PropSpreadingTarget;
            initialPst: PropSpreadingTarget;
            target: 'viewport' | 'table' | 'none';
        }>([
            {
                noViewport: false,
                initialPst: 'viewport',
                propSpreadingTarget: 'root',
                target: 'viewport',
            },
            {
                noViewport: false,
                initialPst: 'viewport',
                propSpreadingTarget: 'table',
                target: 'table',
            },
            {
                noViewport: false,
                initialPst: 'table',
                propSpreadingTarget: 'viewport',
                target: 'viewport',
            },
            {
                noViewport: true,
                initialPst: 'viewport',
                propSpreadingTarget: 'root',
                target: 'table',
            },
            {
                noViewport: true,
                initialPst: 'viewport',
                propSpreadingTarget: 'table',
                target: 'table',
            },
            {
                noViewport: true,
                initialPst: 'table',
                propSpreadingTarget: 'viewport',
                target: 'none',
            },
        ])("Should switch the spreading of unknown attributes into $text when 'noViewport' = $noViewport, 'propSpreadingTarget' => $propSpreadingTarget .", async (args) => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const customAtt = 'data-custom';
            const customAttValue = 'abc';
            const { getByRole, rerender } = render(WjDataView, {
                columns,
                data,
                noViewport: args.noViewport,
                propSpreadingTarget: args.initialPst,
                [customAtt]: customAttValue,
            });

            // Act.
            await rerender({
                columns,
                data,
                noViewport: args.noViewport,
                propSpreadingTarget: args.propSpreadingTarget,
                [customAtt]: customAttValue,
            });
            flushSync();

            // Assert.
            const table = getByRole('table');
            const viewport = table.parentElement!;
            if (args.target === 'table') {
                expect(table.getAttribute(customAtt)).toEqual(customAttValue);
                expect(viewport.getAttribute(customAtt)).toBeFalsy();
            }
            else if (args.target === 'viewport') {
                expect(table.getAttribute(customAtt)).toBeFalsy();
                expect(viewport.getAttribute(customAtt)).toEqual(customAttValue);
            }
            else {
                expect(table.getAttribute(customAtt)).toBeFalsy();
                expect(viewport.getAttribute(customAtt)).toBeFalsy();
            }
        });
        test("Should update the class list on every header cell whenever 'headerCell' changes.", async () => {
            // Arrange.
            const columns = $state<WjDvColumn[]>([
                {
                    key: 'id',
                    text: 'ID',
                    resizable: false,
                },
            ]);
            const data = $state(defineData([{ id: 1 }]));
            const newHeaderClass = 'new-class';
            const { getAllByRole, rerender } = render(WjDataView, {
                columns,
                data,
                headerClass: 'orig-class'
            });

            // Act.
            await rerender({ headerClass: newHeaderClass });
            flushSync();

            // Assert.
            const headerCells = getAllByRole('columnheader');
            headerCells.forEach(c => expect(c.classList.contains(newHeaderClass)).toEqual(true));
        });
        describe('Control Column', () => {
            test.each<{
                controlColumn?: ControlColumn;
                initControlColumn?: ControlColumn;
                text1: string;
                text2: string;
            }>([
                {
                    text1: 'add',
                    text2: 'defined',
                    initControlColumn: undefined,
                    controlColumn: { resizable: false },
                },
                {
                    text1: 'remove',
                    text2: 'undefined',
                    initControlColumn: undefined,
                    controlColumn: { resizable: false },
                },
            ])("Should $text1 the control column whenever 'controlColumn' changes to $text2 .", async ({ initControlColumn, controlColumn }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const { getAllByRole, rerender } = render(WjDataView, { columns, data, controlColumn: initControlColumn });

                // Act.
                await rerender({ columns, data, controlColumn });
                flushSync();

                // Assert.
                let cells = getAllByRole('columnheader');
                expect(cells.length).toEqual(controlColumn ? 3 : 2);
                cells = getAllByRole('cell');
                expect(cells.length).toEqual(controlColumn ? 2 : 1);
            });
            test("Should update the control column's width whenever the 'width' property changes.", () => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn= $state<ControlColumn>({
                    resizable: false,
                    width: 5,
                });
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Act.
                controlColumn.width = 10;
                flushSync();

                // Assert.
                let cells = getAllByRole('columnheader');
                expect(cells[0].style.width).toEqual(`${controlColumn.width}em`);
                cells = getAllByRole('cell');
                expect(cells[0].style.width).toEqual(`${controlColumn.width}em`);
            });
            test.each([
                {
                    text: 'Should',
                    useMinWidthAsWidth: true,
                },
                {
                    text: 'Should not',
                    useMinWidthAsWidth: false,
                },
            ])("$text use the specified 'minWidth' value as width whenever 'useMinWidthAsWidth' changes to $useMinWidthAsWidth .", ({ useMinWidthAsWidth }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn= $state<ControlColumn>({
                    resizable: false,
                    minWidth: 5,
                    useMinWidthAsWidth: !useMinWidthAsWidth
                });
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Act.
                controlColumn.useMinWidthAsWidth = useMinWidthAsWidth;
                flushSync();

                // Assert.
                const expectation = (cell: HTMLElement) => {
                    const x = expect(cell.style.width);
                    if (useMinWidthAsWidth) {
                        return x;
                    }
                    return x.not;
                }
                let cells = getAllByRole('columnheader');
                expectation(cells[0]).toEqual(`${controlColumn.minWidth}em`);
                cells = getAllByRole('cell');
                expectation(cells[0]).toEqual(`${controlColumn.minWidth}em`);
            });
            test.each([
                {
                    hidden: false,
                    text: 'add',
                },
                {
                    hidden: true,
                    text: 'remove',
                },
            ])("Should $text the control column whenever its 'hidden' property changes to $hidden .", ({ hidden }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn= $state<ControlColumn>({
                    resizable: false,
                    hidden: !hidden
                });
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Act.
                controlColumn.hidden = hidden;
                flushSync();

                // Assert.
                let cells = getAllByRole('columnheader');
                expect(cells.length).toEqual(hidden ? 2 : 3);
                cells = getAllByRole('cell');
                expect(cells.length).toEqual(hidden ? 1 : 2);
            });
            test.each<{
                initialAlignment: ColAlignment;
                alignment: ColAlignment;
                expectedClass: string;
            }>([
                {
                    initialAlignment: 'start',
                    alignment: 'center',
                    expectedClass: 'align-center',
                },
                {
                    initialAlignment: 'center',
                    alignment: 'end',
                    expectedClass: 'align-end',
                },
                {
                    initialAlignment: 'end',
                    alignment: 'start',
                    expectedClass: 'align-start',
                },
            ])("Should align the contents of the control column when 'alignment' changes to $alignment .", (args) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn = $state<ControlColumn>({
                    resizable: false,
                    alignment: args.initialAlignment,
                });
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Act.
                controlColumn.alignment = args.alignment;
                flushSync();

                // Assert.
                const dataCell = getAllByRole('cell')[0].querySelector('div.dataview-cell-d');
                expect(dataCell?.classList.contains(args.expectedClass)).toEqual(true);
            });
            test.each([
                {
                    noTextWrap: false,
                    text: 'allow',
                },
                {
                    noTextWrap: true,
                    text: 'disallow',
                },
            ])("Should $text text wrapping in the control column's data cells when 'noTextWrap' changes to $noTextWrap .", ({ noTextWrap }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                const controlColumn = $state<ControlColumn>({
                    resizable: false,
                    noTextWrap: !noTextWrap
                });
                const { getAllByRole } = render(WjDataView, { columns, data, controlColumn });

                // Act.
                controlColumn.noTextWrap = noTextWrap;
                flushSync();

                // Assert.
                const dataCell = getAllByRole('cell')[0].querySelector('div.dataview-cell-d');
                expect(dataCell?.classList.contains('no-wrap')).toEqual(noTextWrap);
            });
        });
    });
    describe('Column Behaviors', () => {
        describe('Initial Render', () => {
            test("Should render the column with the specified width in the column definition's 'width' property.", () => {
                // Arrange.
                const colWidth = 13.5;
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        width: colWidth,
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data });

                // Assert.
                const headerCell = getAllByRole('columnheader')[0];
                const dataCell = getAllByRole('cell')[0];
                expect(headerCell.style.width).toEqual(`${colWidth}em`);
                expect(dataCell.style.width).toEqual(`${colWidth}em`);
            });
            test.each([
                {
                    defaultWidth: undefined,
                    text: "Control's default"
                },
                {
                    defaultWidth: 14,
                    text: "Explicit default"
                },
            ])("Should render the column with the default width when the column carries no width information: $text", ({ defaultWidth }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, defaultWidth });

                // Assert.
                const headerCell = getAllByRole('columnheader')[0];
                const dataCell = getAllByRole('cell')[0];
                expect(headerCell.style.width).toEqual(`${defaultWidth ?? 10}em`);
                expect(dataCell.style.width).toEqual(`${defaultWidth ?? 10}em`);
            });
            test.each([
                {
                    useMinWidthAsWidth: false,
                    minWidth: 12,
                    expectedWidth: 10,
                    text: "Should not"
                },
                {
                    useMinWidthAsWidth: true,
                    minWidth: 12,
                    expectedWidth: 12,
                    text: "Should"
                },
            ])("$text use the column's 'minWidth' value as width when the column's 'useMinWidthAsWidth' is $useMinWidthAsWidth .", ({
                useMinWidthAsWidth,
                expectedWidth,
                minWidth
            }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        minWidth,
                        useMinWidthAsWidth
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data });

                // Assert.
                const headerCell = getAllByRole('columnheader')[0];
                const dataCell = getAllByRole('cell')[0];
                expect(headerCell.style.width).toEqual(`${expectedWidth}em`);
                expect(dataCell.style.width).toEqual(`${expectedWidth}em`);
            });
            test("Should display the column's text inside the header cell by default.", () => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'Column A',
                        resizable: false,
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data });

                // Assert.
                const headerCell = getAllByRole('columnheader')[0];
                expect(headerCell.textContent?.trim()).toEqual(columns[0].text);
            });
            test.each([
                {
                    pinned: false,
                    text: 'unpinned'
                },
                {
                    pinned: true,
                    text: 'pinned'
                },
            ])("Should render the column $text when its 'pinned' property is $pinned .", ({ pinned }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        pinned
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data });

                // Assert.
                const headerCell = getAllByRole('columnheader')[0];
                const dataCell = getAllByRole('cell')[0];
                expect(headerCell.classList.contains('sticky-header')).toEqual(pinned);
                expect(dataCell.classList.contains('sticky-data')).toEqual(pinned);
            });
            test("Should render pinned columns before unpinned columns.", () => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                    },
                    {
                        key: 'b',
                        text: 'B',
                        resizable: false,
                        pinned: true,
                    },
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi',
                        b: 'tester'
                    },
                ]));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data });

                // Assert.
                const headerCells = getAllByRole('columnheader');
                expect(headerCells[0].textContent?.trim()).toEqual(columns[1].text);
            });
            test.each([
                {
                    column: {
                        key: 'testCol',
                        text: 'Test Column',
                        resizable: false,
                        hidden: false,
                    },
                    text: 'Should',
                },
                {
                    column: {
                        key: 'testCol',
                        text: 'Test Column',
                        resizable: false,
                        hidden: true,
                    },
                    text: 'Should not',
                },
            ])("$text render the column with key $column.key when its 'hidden' property is $column.hidden .", ({ column }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                    },
                    column
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi',
                        [column.key]: 'Data value'
                    }
                ]));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data });

                // Assert.
                const headerCells = getAllByRole('columnheader');
                const dataCells = getAllByRole('cell');
                expect(headerCells.length).toEqual(column.hidden ? 2 : 3);
                expect(dataCells.length).toEqual(column.hidden ? 1 : 2);
                expect(headerCells[1]?.textContent?.trim()).toEqual(column.hidden ? '' : column.text);
                expect(dataCells[1]?.textContent?.trim()).toEqual(column.hidden ? undefined : data[0][column.key]);
            });
            test.each<{ alignment: ColAlignment; text: string; }>([
                {
                    alignment: 'center',
                    text: 'center',
                },
                {
                    alignment: 'end',
                    text: 'right',
                },
                {
                    alignment: 'start',
                    text: 'left',
                },
            ])("Should align column data to the $text whenever the column's 'alignment' property is $alignment .", ({ alignment }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        alignment
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));

                // Act.
                const { getByRole } = render(WjDataView, { columns, data });

                // Assert.
                const dataCell = getByRole('cell');
                const dataContainer = dataCell.querySelector('div.dataview-cell-d');
                expect(dataContainer?.classList.contains(`align-${alignment}`)).toEqual(true);
            });
            test.each([
                {
                    text: 'prevent',
                    noTextWrap: true,
                },
                {
                    text: 'allow',
                    noTextWrap: false,
                },
            ])("Should $text wrapping of cell content whenever the 'noTextWrap' property is $noTextWrap .", ({ noTextWrap }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        noTextWrap
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));

                // Act.
                const { getByRole } = render(WjDataView, { columns, data });

                // Assert.
                const dataCell = getByRole('cell');
                const dataContainer = dataCell.querySelector('div.dataview-cell-d');
                expect(dataContainer?.classList.contains('no-wrap')).toEqual(noTextWrap);
            });
            test.each([
                {
                    dataCellSnippet: createRawSnippet<[DataCellContext]>((ctx) => {
                        return {
                            render() {
                                return `${ctx().getFn(ctx().row)}`
                            },
                        }
                    }),
                    text: "rendering the 'dataCell' snippet",
                },
                {
                    dataCellSnippet: undefined,
                    text: "rendering the default cell content"
                }
            ])("Should use the column's get() function when $text .", ({ dataCellSnippet }) => {
                // Arrange.
                const getFn = vi.fn();
                getFn.mockReturnValue('Cell data');
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        get: getFn
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));

                // Act.
                render(WjDataView, { columns, data });

                // Assert.
                expect(getFn).toHaveBeenCalledOnce();
            });
        });
        describe('Reactivity', () => {
            test("Should update the column's width whenever the 'width' property is updated.", () => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        width: 5
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));
                const { getAllByRole } = render(WjDataView, { columns, data });
                const headerCell = getAllByRole('columnheader')[0];
                expect(headerCell.style.width).toEqual("5em");

                // Act.
                columns[0].width = 20;
                flushSync();

                // Assert.
                expect(headerCell.style.width).toEqual("20em");
            });
            test.each([
                {
                    property: 'minWidth',
                    initial: {
                        useMinWidthAsWidth: true,
                        minWidth: 3,
                    },
                    update: {
                        minWidth: 4,
                    },
                    expectedWidth: 4,
                },
                {
                    property: 'useMinWidthAsWidth',
                    initial: {
                        useMinWidthAsWidth: false,
                        minWidth: 4,
                    },
                    update: {
                        useMinWidthAsWidth: true,
                    },
                    expectedWidth: 4
                },
            ])("Should update the column's width whenever $property changes.", ({ initial, update, expectedWidth }) => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        ...initial
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));
                const { getAllByRole } = render(WjDataView, { columns, data });

                // Act.
                columns[0] = {
                    ...columns[0],
                    ...update
                };
                flushSync();

                // Assert.
                const headerCell = getAllByRole('columnheader')[0];
                expect(headerCell.style.width).toEqual(`${expectedWidth}em`);
            });
            test("Should update the column's title whenever the 'text' property changes.", () => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));
                const { getAllByRole } = render(WjDataView, { columns, data });

                // Act.
                columns[0].text = 'B';
                flushSync();

                // Assert.
                const dataCell = getAllByRole('columnheader')[0];
                expect(dataCell.textContent?.trim()).toEqual('B');
            });
            test.each([
                {
                    pinned: false,
                    text: 'unpin'
                },
                {
                    pinned: true,
                    text: 'pin'
                },
            ])("Should $text the column whenever the 'pinned' property changes to $pinned .", ({ pinned }) => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        pinned: !pinned,
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));
                const { getAllByRole } = render(WjDataView, { columns, data });
                let headerCell = getAllByRole('columnheader')[0];
                expect(headerCell.classList.contains('sticky-header')).toEqual(!pinned);

                // Act.
                columns[0].pinned = pinned;
                flushSync();

                // Assert.
                headerCell = getAllByRole('columnheader')[0];
                expect(headerCell.classList.contains('sticky-header')).toEqual(pinned);
            });
            test.each([
                {
                    hidden: false,
                    text: 'show',
                },
                {
                    hidden: true,
                    text: 'hide',
                },
            ])("Should $text the column whenever the 'hidden' property changes to $hidden .", ({ hidden }) => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        hidden: !hidden,
                    },
                    {
                        key: 'b',
                        text: 'B',
                        resizable: false,
                    },
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi',
                        b: 23
                    }
                ]));
                const { getAllByRole } = render(WjDataView, { columns, data });
                let headerCells = getAllByRole('columnheader');
                expect(headerCells.length).toEqual(columns.length + 1 - (hidden ? 0 : 1));

                // Act.
                columns[0].hidden = hidden;
                flushSync();

                // Assert.
                headerCells = getAllByRole('columnheader');
                expect(headerCells.length).toEqual(columns.length + 1 - (!hidden ? 0 : 1));
            });
            test.each<{ initial?: ColAlignment; alignment?: ColAlignment; text: string; }>([
                {
                    alignment: 'center',
                    text: 'center',
                },
                {
                    alignment: 'end',
                    text: 'right',
                },
                {
                    initial: 'center',
                    alignment: 'start',
                    text: 'left',
                },
                {
                    initial: 'center',
                    text: 'left',
                },
            ])("Should align data cell contents to the $text whenever the 'alignment' property changes to $alignment .", ({ initial, alignment }) => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        alignment: initial,
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));
                const { getByRole } = render(WjDataView, { columns, data });
                let dataCell = getByRole('cell').querySelector('div.dataview-cell-d');
                expect(dataCell!.classList.contains(`align-${alignment ?? 'start'}`)).toEqual(false);

                // Act.
                columns[0].alignment = alignment;
                flushSync();

                // Assert.
                expect(dataCell!.classList.contains(`align-${alignment ?? 'start'}`)).toEqual(true);
            });
            test.each([
                {
                    noTextWrap: false,
                    text: 'on',
                },
                {
                    noTextWrap: true,
                    text: 'off',
                },
            ])("Should turn text wrapping $text whenever the 'noTextWrap' property changes to $noTextWrap .", ({ noTextWrap }) => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                        noTextWrap: !noTextWrap,
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));
                const { getByRole } = render(WjDataView, { columns, data });
                let dataCell = getByRole('cell').querySelector('div.dataview-cell-d');
                expect(dataCell!.classList.contains('no-wrap')).toEqual(!noTextWrap);

                // Act.
                columns[0].noTextWrap = noTextWrap;
                flushSync();

                // Assert.
                expect(dataCell!.classList.contains('no-wrap')).toEqual(noTextWrap);
            });
            test("Should re-render the contents of data cells whenever the 'get' property changes.", () => {
                //Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'a',
                        text: 'A',
                        resizable: false,
                    }
                ]);
                const data = $state<WjDvRow[]>(defineData([
                    {
                        id: 1,
                        a: 'Hi'
                    }
                ]));
                const getFn = vi.fn();
                render(WjDataView, { columns, data });

                // Act.
                columns[0].get = getFn;
                flushSync();

                // Assert.
                expect(getFn).toHaveBeenCalledOnce();
            });
        });
    });
    describe('Row Behaviors', () => {
        describe('Initial Render', () => {
            test.each([
                {
                    text: 'Should not',
                    selected: false,
                },
                {
                    text: 'Should',
                    selected: true,
                },
            ])("$text highlight the row whenever 'selected' is $selected .", ({ selected }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                data[0].wjdv.selected = selected;

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, rowSelectionHighlight: true });

                // Assert.
                const row = getAllByRole('row')[1];
                expect(row.classList.contains('selected')).toEqual(selected);
            });
            test.each([
                {
                    expanded: false,
                    text: 'Should not',
                },
                {
                    expanded: true,
                    text: 'Should',
                },
            ])("$text add the row expansion element whenever 'expanded' is $expanded .", ({ expanded }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                data[0].wjdv.expanded = expanded;
                const rowExpansion = createRawSnippet(() => ({ render: () => `<div></div>` }));

                // Act.
                const { getAllByRole } = render(WjDataView, { columns, data, rowExpansion });

                // Assert.
                const row = getAllByRole('row')[1];
                expect(!!row.querySelector('div.dataview-row-expansion')).toEqual(expanded);
            });
        });
        describe('Reactivity', () => {
            test.each([
                {
                    text: 'remove',
                    selected: false,
                },
                {
                    text: 'add',
                    selected: true,
                },
            ])("Should $text row highlighting whenever 'selected' changes to $selected .", ({ selected }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                data[0].wjdv.selected = !selected;
                const { getAllByRole } = render(WjDataView, { columns, data, rowSelectionHighlight: true });

                // Act.
                data[0].wjdv.selected = selected;
                flushSync();

                // Assert.
                const row = getAllByRole('row')[1];
                expect(row.classList.contains('selected')).toEqual(selected);
            });
            test.each([
                {
                    expanded: false,
                    text: 'remove',
                },
                {
                    expanded: true,
                    text: 'add',
                },
            ])("Should $text the row expansion element whenever 'expanded' changes to $expanded .", ({ expanded }) => {
                // Arrange.
                const columns = $state<WjDvColumn[]>([
                    {
                        key: 'id',
                        text: 'ID',
                        resizable: false,
                    },
                ]);
                const data = $state(defineData([{ id: 1 }]));
                data[0].wjdv.expanded = !expanded;
                const rowExpansion = createRawSnippet(() => ({ render: () => `<div></div>` }));
                const { getAllByRole } = render(WjDataView, { columns, data, rowExpansion });

                // Act.
                data[0].wjdv.expanded = expanded;
                flushSync();

                // Assert.
                const row = getAllByRole('row')[1];
                expect(!!row.querySelector('div.dataview-row-expansion')).toEqual(expanded);
            });
        });
    });
    describe('defineData', () => {
        test.each([
            {
                data: [
                    {
                        id: 1,
                        name: 'John',
                    },
                ],
                text: "Data without wjdv",
            },
            {
                data: [
                    {
                        id: 1,
                        name: 'John',
                        wjdv: {},
                    },
                ],
                text: "Data with wjdv",
            },
        ])('Should add the wjdv property to all data items: $text', ({ data }) => {
            // Act.
            data = defineData(data);

            // Assert.
            for (let item of data) {
                expect((item as WjDvRow).wjdv).toBeTruthy();
            }
        });
        test('Should preserve wjdv property values when the data already has it.', () => {
            // Arrange.
            const wjdv = {};

            // Act.
            const data = defineData([{ id: 1, wjdv }]);

            // Assert.
            expect(data[0].wjdv).toBe(wjdv);
        });
        test.each([
            {
                value: 123,
                text: 'Integer'
            },
            {
                value: 45.456,
                text: 'Floating point value'
            },
            {
                value: true,
                text: 'Boolean true'
            },
            {
                value: false,
                text: 'Boolean false'
            },
            {
                value: [],
                text: 'Array'
            },
            {
                value: new Date(),
                text: 'Date object'
            },
            {
                value: new Set(),
                text: 'Set object'
            },
            {
                value: function () { },
                text: 'Function'
            },
        ])('Should throw an error if any data item in the provided data contains $text in the wjdv property.', ({ value }) => {
            // Act.
            const act = () => defineData([{ id: 1, wjdv: value }]);

            // Assert.
            expect(act).toThrow();
        });
        test("Should throw an error if a data object doesn't have the 'id' property.", () => {
            // Act.
            const act = () => defineData([{ name: 'Jack' }]);

            // Assert.
            expect(act).toThrow();
        });
        test.each([
            {
                data: [
                    {
                        key: 'a'
                    },
                    {
                        key: 'b'
                    },
                ],
                expectedCalls: 2,
                text: '2 items',
            },
            {
                data: [
                    {
                        id: 1,
                        key: 'a'
                    },
                    {
                        key: 'b'
                    },
                ],
                expectedCalls: 1,
                text: '2 items',
            },
        ])("Should call the provided ID-generation function for data objects that don't carry the 'id' property: $text, $expectedCalls call(s)", ({ data, expectedCalls }) => {
            // Arrange.
            const idGenFn = vi.fn();
            idGenFn.mockReturnValue(100);

            // Act.
            defineData(data, idGenFn);

            // Assert.
            expect(idGenFn).toHaveBeenCalledTimes(expectedCalls);
        });
        test("Should throw an error if data needs ID generation, but the ID generation function is not provided.", () => {
            // Act.
            const act = () => defineData([{ key: 'd' }]);

            // Assert.
            expect(act).toThrow();
        });
        test("Should return the given array as opposed to creating a new one.", () => {
            // Arrange.
            const origData = [{ id: 123 }];

            // Act.
            const resultingData = defineData(origData);

            // Assert.
            expect(resultingData).toBe(origData);
        });
        test("Should mutate the given data objects as opposed to creating new ones.", () => {
            // Arrange.
            const origData = [{ id: 123 }];

            // Act.
            const resultingData = defineData(origData);

            // Assert.
            for (let i = 0; i < origData.length; ++i) {
                expect(resultingData[i]).toBe(origData[i]);
            }
        });
    });
});