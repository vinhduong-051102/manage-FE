// file dùng để căn chỉnh button loadding
import React from 'react'
import PropTypes from 'prop-types'
import { ButtonLoading } from './styles'

const ButtonLogin = ({ onClick, loading, value }) => (
  <div>
    <ButtonLoading onClick={onClick} loading={loading}>
      {value}
    </ButtonLoading>
  </div>
)

ButtonLogin.propTypes = {
  loading: PropTypes.bool,
  value: PropTypes.string,
  onClick: PropTypes.func
}
export default ButtonLogin
