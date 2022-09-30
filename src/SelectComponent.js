import React, { useEffect, useState } from 'react'
import styles from './select.module.css'

export const SelectComponent = ({ multiple, value, onChange, options }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined)
  }

  const selectOption = option => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value)
        onChange(option)
    }
  }

  const isOptionSelected = option => {
    if (multiple) {
      return value.includes(option)
    } else {
      return option === value
    }
  }

  useEffect(() => {
    if (isOpen)
      setHighlightedIndex(0)
  }, [isOpen])


  return (
    <div
      onBlur={() => setIsOpen(false)}
      className={styles.container}
      tabIndex={0}
      onClick={() => setIsOpen(prev => !prev)}
    >
      <span className={styles.value}>
        {multiple ?
          value.map(v => (
            <button
              key={v.value}
              onClick={e => {
                e.stopPropagation()
                selectOption(v)
              }}
              className={styles['option-badge']}
            >
              {v.label}
              <span className={styles['clear-btn']}>&times;</span></button>
          ))
          : value?.label}
      </span>
      <button
        className={styles['clear-btn']}
        onClick={e => {
          e.stopPropagation()
          clearOptions()
        }}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {
          options.map((option, index) => {
            return <li
              key={option.label}
              className={
                ` ${styles.option} 
                  ${isOptionSelected(option) ? styles.selected : ''}
                  ${index === highlightedIndex ? styles.highlighted : ''}
                `
              }
              onClick={e => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          })
        }
      </ul>
    </div>
  )
}
