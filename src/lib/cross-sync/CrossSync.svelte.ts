/**
 * Class that defines the necessary state for synchronizing columns between different dataview components.
 */
export class CrossSync {
	/**
	 * Control value that determines the expected left position of the column.  The synchronization algorithm will 
	 * increment this value util all synchronized columns are in the expected position.
	 */
	expectedLeft = $state(0);
	/**
	 * Value that holds the current state of all synchronized properties.
	 */
	value = $state({} as Record<string, any>);
}
