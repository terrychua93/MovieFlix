import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TagProps {
  label: string;
  onPress: () => void;
};

const Tag = (props: TagProps) => {
  return (
    <TouchableOpacity style={styles.tag} onPress={props.onPress}>
      <Text style={styles.tagText}>{props.label}</Text>
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
});

export default Tag;
