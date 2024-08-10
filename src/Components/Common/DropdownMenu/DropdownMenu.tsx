import React, {useEffect, useState} from 'react';

interface DropdownMenuProps {
    items: string[];
    initialItem: string | undefined;
    onSelect: (item: string) => Promise<void>;
    onCreate: (item: string) => Promise<boolean>;
}


export function DropdownMenu({items, onSelect, onCreate, initialItem}: DropdownMenuProps) {
    const [menuItems, setMenuItems] = useState<string[]>(items);
    const [selectedItem, setSelectedItem] = useState<string | undefined>(initialItem);
    const [newItem, setNewItem] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);

    useEffect(() => {
        setMenuItems(items);
    }, [items]);

    useEffect(() => {
        if (selectedItem === undefined || items.includes(selectedItem)) {
            return;
        }
    }, [selectedItem, onSelect]);

    const handleSelect = (item: string) => {
        async function handleSelectAsync(item: string) {

            await onSelect(item);
            setSelectedItem(item);
        }

        handleSelectAsync(item)
    };

    function handleAddItem() {
        async function handleAddItemAsync() {
            const newEntry = newItem.trim();

            if ((newEntry && !menuItems.includes(newEntry)) == false) {
                return;
            }

            setIsCreating(true);
            const result = await onCreate(newEntry);
            setIsCreating(false);

            if (result) {
                const updatedMenuItems = [...menuItems, newEntry];
                setMenuItems(updatedMenuItems);
                setNewItem('');
            }
        };

        handleAddItemAsync();
    }


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
