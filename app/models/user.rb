class User < ApplicationRecord
  has_many :holdings

  validates :name, presence: true
end
