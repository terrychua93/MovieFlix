import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TagProps {
  label: string;
  onPress: () => void;
  selected?: boolean;
}

const Tag = ({ label, onPress, selected = false }: TagProps) => {
  return (
    <TouchableOpacity
      style={[styles.tag, selected && styles.selectedTag]}
      onPress={onPress}
    >
      <Text style={[styles.tagText, selected && styles.selectedTagText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#2c5364',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedTag: {
    backgroundColor: '#fff',
  },
  selectedTagText: {
    color: '#000',
  },
});

export default Tag;
