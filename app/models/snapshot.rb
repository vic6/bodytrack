class Snapshot < ApplicationRecord
  belongs_to :user
  # default_scope -> { order(created_at: :desc) }
  # validates :picture, presence: true
  mount_uploader :picture, PictureUploader
end
