import React from 'react'
import styled from 'styled-components'

export default function Mid() {
  return (
    <div style={{ flex: 1 }}>
          <div style={{ height: 'calc(70% - 10px)', backgroundColor: 'purple', marginBottom: '10px' }}>4</div>
          <div style={{ height: 'calc(30% - 10px)', backgroundColor: 'orange' }}>5</div>
    </div>
  )
}
