import Cube from './Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('method removeDimensionHierarchy must work', () => {

	it('should define removeDimensionHierarchy', () => {
		expect(Cube.prototype.removeDimensionHierarchy).toBeDefined();
	});

	let debug;
	let facts;
	let cells;
	let cube;
	let removeDimensionHierarchy;

	beforeEach(() => {
		facts = [
			{ id: 1, x: 1 },
			{ id: 2, x: 2 },
		];
		cells = [
			{ id: 1, x_id: 1 },
			{ id: 2, x_id: 2 }
		];
		cube = Cube.create(facts, [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x']
				}
			}
		]);
		removeDimensionHierarchy = () => {
			cube.removeDimensionHierarchy(cube.dimensionHierarchies[0]);
		}
	});

	it('cellTable must be changed', () => {
		debug = isEqualObjects(cube.cellTable, cells);
		removeDimensionHierarchy();
		debug = isEqualObjects(cube.cellTable, facts);
	});

	it('getDimensionMembers must return members', () => {
		isEqualObjects(cube.getDimensionMembers('x'), facts);
		removeDimensionHierarchy();
		expect(() => {
			cube.getDimensionMembers('x')
		}).toThrow();
	});
});
