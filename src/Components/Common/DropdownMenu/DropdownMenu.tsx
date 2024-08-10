import React, {useEffect, useState} from 'react';

interface DropdownMenuProps {
items: string[];
initialItem: string | undefined;
onSelect: (item: string) => Promise<void>;
onCreate: (item: string) => Promise<boolean>;
}


export function DropdownMenu({ items, onSelect, onCreate, initialItem }: DropdownMenuProps) {
    const [menuItems, setMenuItems] = useState<string[]>(items);
    const [selectedItem, setSelectedItem] = useState<string | undefined>(initialItem);
    const [newItem, setNewItem] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);

    useEffect(() => {
        setMenuItems(items);

        if (selectedItem && !items.includes(selectedItem)) {
            const newSelectedItem = items.length > 0 ? items[0] : undefined;
            setSelectedItem(newSelectedItem);
            if (newSelectedItem) {
                onSelect(newSelectedItem);
            }
        }
    }, [items, selectedItem, onSelect]);

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        onSelect(item);
    };

    const handleAddItem = async () => {
        const newEntry = newItem.trim();

        if (newEntry && !menuItems.includes(newEntry)) {
            setIsCreating(true);

            const result = await onCreate(newEntry);

            setIsCreating(false);

            if (result) {
                const updatedMenuItems = [...menuItems, newEntry];
                setMenuItems(updatedMenuItems);
                setNewItem('');
                setSelectedItem(newEntry);
                onSelect(newEntry);
            }
        }
    };

    return (
        <div>
            <select value={selectedItem} onChange={(e) => handleSelect(e.target.value)}>
                {menuItems.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item"
                />
                <button onClick={handleAddItem} disabled={isCreating}>Add</button>
            </div>
        </div>
    );
}
